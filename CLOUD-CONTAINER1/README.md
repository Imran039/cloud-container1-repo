# CLOUD-CONTAINER1

This microservice stores files in a persistent volume and forwards calculation requests to CLOUD-CONTAINER2.

## Endpoints:

### 1. Store File

- **POST /store-file**
- Stores a file with provided data in the persistent volume.
- **Request JSON:**
  ```json
  {
    "file": "file.dat",
    "data": "product, amount \nwheat, 10\nwheat, 20\noats, 5"
  }
  ```
