# Deployment Guide

## Local Development (Current Setup)

Already configured! Just run the setup script and follow GETTING_STARTED.md

## Production Deployment

### Docker Deployment

#### Create Dockerfile for Backend

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["python", "main.py"]
```

#### Create Dockerfile for Frontend

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist ./dist
EXPOSE 5173
CMD ["serve", "-s", "dist", "-l", "5173"]
```

#### Docker Compose

```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      OLLAMA_BASE_URL: http://ollama:11434
    depends_on:
      - ollama

  frontend:
    build: ./frontend
    ports:
      - "5173:5173"
    depends_on:
      - backend

  ollama:
    image: ollama/ollama:latest
    ports:
      - "11434:11434"
    volumes:
      - ollama_data:/root/.ollama
    command: serve

volumes:
  ollama_data:
```

Deploy with:
```bash
docker-compose up -d
```

### AWS Deployment

#### Option 1: AWS EC2

1. Launch EC2 instance (Ubuntu 22.04, t3.xlarge minimum)
2. SSH into instance
3. Install Docker and Docker Compose
4. Clone repository
5. Configure security groups to allow ports 5173, 8000, 11434
6. Run Docker Compose

#### Option 2: AWS AppRunner

1. Push Docker images to ECR
2. Create AppRunner service
3. Set environment variables
4. Deploy

#### Option 3: AWS Lambda + API Gateway

For serverless deployment (advanced):
- Package backend as Lambda functions
- Use API Gateway for routing
- Use S3 + CloudFront for frontend
- Use SageMaker or EC2 for Ollama

### Google Cloud Deployment

#### Option 1: Google Cloud Run

```bash
# Build and push backend
gcloud builds submit --tag gcr.io/PROJECT_ID/ai-rules-backend backend/
gcloud run deploy ai-rules-backend \
  --image gcr.io/PROJECT_ID/ai-rules-backend \
  --platform managed

# Build and push frontend
gcloud builds submit --tag gcr.io/PROJECT_ID/ai-rules-frontend frontend/
gcloud run deploy ai-rules-frontend \
  --image gcr.io/PROJECT_ID/ai-rules-frontend \
  --platform managed
```

#### Option 2: Google Compute Engine

1. Create VM instance
2. Install Docker
3. Deploy using Docker Compose (similar to AWS)

### Azure Deployment

#### Azure Container Instances

```bash
az container create \
  --resource-group myResourceGroup \
  --name ai-rules \
  --image myacr.azurecr.io/ai-rules:latest \
  --ports 5173 8000 11434
```

#### Azure App Service

1. Create App Service Plan
2. Deploy Docker container
3. Configure environment variables
4. Monitor performance

## Environment Variables for Production

Create `.env.production`:

```env
# Backend
DATABASE_URL=postgresql://user:password@db:5432/ai_rules
OLLAMA_BASE_URL=http://ollama:11434
OLLAMA_MODEL=llama2
LOG_LEVEL=INFO
CORS_ORIGINS=https://yourdomain.com
RATE_LIMIT=100

# Frontend
VITE_API_URL=https://api.yourdomain.com
VITE_LOG_LEVEL=warn
```

## SSL/TLS Configuration

### With Nginx Reverse Proxy

```nginx
server {
    listen 443 ssl;
    server_name yourdomain.com;

    ssl_certificate /etc/ssl/certs/cert.pem;
    ssl_certificate_key /etc/ssl/private/key.pem;

    location / {
        proxy_pass http://frontend:5173;
    }

    location /api {
        proxy_pass http://backend:8000;
    }
}
```

### Let's Encrypt (Free SSL)

```bash
certbot certonly --standalone -d yourdomain.com
```

## Performance Optimization for Production

### Backend Optimization

1. **Gunicorn/Uvicorn workers**:
```bash
gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app
```

2. **Response caching**:
```python
from functools import lru_cache

@lru_cache(maxsize=100)
def get_company_guidelines(company_name: str):
    ...
```

3. **Database connection pooling**:
```python
from sqlalchemy.pool import QueuePool
```

### Frontend Optimization

1. **Minification**: Already done by Vite build
2. **Code splitting**: Lazy load components
3. **Asset compression**: gzip/brotli enabled in Nginx

### Ollama Optimization

1. **Use quantized models**: `ollama pull llama2:q4` (4-bit, smaller)
2. **GPU support**: Use CUDA-enabled servers
3. **Model caching**: Keep model loaded

## Monitoring

### Application Monitoring

```bash
# CPU, Memory, Network
docker stats

# Log aggregation
docker logs -f container_name

# ELK Stack (Elasticsearch, Logstash, Kibana)
# Grafana + Prometheus
```

### Health Checks

```yaml
# Docker Compose
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:8000/health"]
  interval: 30s
  timeout: 10s
  retries: 3
```

## Backup Strategy

```bash
# Backup Ollama models
docker exec ollama_container tar -czf models.tar.gz /root/.ollama

# Backup database (if using PostgreSQL)
pg_dump -U user -d database > backup.sql

# Automated backups with cron
0 2 * * * /path/to/backup-script.sh
```

## Scaling

### Horizontal Scaling

```yaml
# Multiple backend instances behind load balancer
services:
  backend:
    deploy:
      replicas: 3
```

### Vertical Scaling

- Increase VM/container resources
- Use larger instance types
- Add more CPU cores for Ollama

### Caching Strategy

```python
# Redis caching
from redis import Redis
cache = Redis(host='redis', port=6379)

# Cache analysis results
cache_key = f"analysis:{company_name}"
if cache.exists(cache_key):
    return cache.get(cache_key)
```

## Cost Estimation (AWS)

| Component | Size | Cost/Month |
|-----------|------|-----------|
| EC2 (t3.xlarge) | - | ~$150 |
| RDS (db.t3.micro) | - | ~$30 |
| Bandwidth | 100GB | ~$10 |
| **Total** | - | **~$190** |

## Security Checklist

- [ ] Enable HTTPS/TLS
- [ ] Set strong database passwords
- [ ] Use environment variables for secrets
- [ ] Enable API rate limiting
- [ ] Implement authentication
- [ ] Enable CORS properly
- [ ] Keep dependencies updated
- [ ] Run security scanning
- [ ] Enable logging and monitoring
- [ ] Use private networking

## Maintenance

### Regular Updates

```bash
# Update dependencies
pip install --upgrade -r requirements.txt
npm update

# Update Docker images
docker pull ollama/ollama:latest
docker pull node:18-alpine
```

### Database Maintenance

```bash
# Vacuum (PostgreSQL)
VACUUM ANALYZE;

# Index optimization
REINDEX DATABASE dbname;
```

## Troubleshooting Production

### High Memory Usage

1. Check running processes
2. Restart Ollama container
3. Reduce model size
4. Increase server RAM

### Slow API Responses

1. Check database queries
2. Monitor Ollama
3. Add caching layer
4. Horizontal scaling

### 500 Errors

1. Check logs: `docker logs container_name`
2. Verify Ollama connection
3. Check database availability
4. Review recent deployments

## Support

For deployment questions:
- Consult cloud provider documentation
- Review Docker best practices
- Check FastAPI deployment guide
- Open GitHub issue for bugs

---

**Ready to go live? Deploy with confidence!** 🚀
