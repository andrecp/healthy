# Backend

### Generating a migration

```bash
docker compose exec backend bash
cd alembic
alembic revision --autogenerate -m "Create users table"

alembic upgrade head
```

### Connecting to the database manually

```bash
docker compose exec postgres bash
psql -U postgres
```
