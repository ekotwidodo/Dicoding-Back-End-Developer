# Latihan Membuat Permintaan HTTP (HTTP Request)

## Mendapatkan daftar kopi yang tersedia

```bash
curl -X GET https://coffee-api.dicoding.dev/coffees -i
```

Keterangan kode:

* **curl** : merupakan perintah untuk menggunakan program cURL pada Terminal atau CMD.
* **-X GET** : menetapkan HTTP method/verb yang kita gunakan. GET berarti kita ingin mendapatkan sebuah data.
* **https://coffee-api.dicoding.dev/coffees** : merupakan alamat request yang dituju.
* **-i** : memberikan informasi detail terhadap response yang diberikan (HTTP response headers).

## Membuat permintaan untuk membeli kopi yang tersedia

```bash
curl -X POST -H "Content-Type: application/json" -d "{\"name\": \"Kopi Tubruk\"}" https://coffee-api.dicoding.dev/transactions -i
```

## Membuat permintaan untuk membeli kopi yang tidak tersedia

```bash
curl -X POST -H "Content-Type: application/json" -d "{\"name\": \"Kopi Luwak\"}" https://coffee-api.dicoding.dev/transactions -i
```
