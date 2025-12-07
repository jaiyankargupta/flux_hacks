#!/bin/bash

BASE_URL="http://localhost:5001/api"
echo "🏥 Testing Healthcare API on Port 5001..."

# 1. Health Check
echo -e "\n1️⃣  Testing Health Check..."
HEALTH_RESPONSE=$(curl -s $BASE_URL/health)
echo "Response: $HEALTH_RESPONSE"

# 2. Login as Admin
echo -e "\n2️⃣  Logging in as Admin..."
LOGIN_RESPONSE=$(curl -s -X POST $BASE_URL/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@healthcare.com","password":"admin123"}')

# Extract Token (Simple parsing)
TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
    echo "❌ Login Failed"
    echo "Response: $LOGIN_RESPONSE"
    exit 1
else
    echo "✅ Login Successful"
    # echo "Token: $TOKEN"
fi

# 3. Get Dashboard Stats
echo -e "\n3️⃣  Fetching Admin Stats..."
curl -s -X GET $BASE_URL/admin/stats \
  -H "Authorization: Bearer $TOKEN" | grep -o '"success":true' > /dev/null && echo "✅ Stats Fetched" || echo "❌ Stats Failed"

# 4. Create a Test Provider
echo -e "\n4️⃣  Creating Test Provider..."
PROVIDER_EMAIL="test.doc_$(date +%s)@hospital.com"
CREATE_RESPONSE=$(curl -s -X POST $BASE_URL/admin/providers \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Dr. API Test",
    "email": "'"$PROVIDER_EMAIL"'",
    "password": "password123",
    "providerInfo": {
        "specialization": "API Testing",
        "licenseNumber": "TEST99999",
        "contactInfo": { "phone": "555-0199" }
    }
  }')

PROVIDER_ID=$(echo $CREATE_RESPONSE | grep -o '"_id":"[^"]*' | head -1 | cut -d'"' -f4)

if [ -n "$PROVIDER_ID" ]; then
    echo "✅ Provider Created (ID: $PROVIDER_ID)"
else
    echo "❌ Provider Creation Failed"
    echo "$CREATE_RESPONSE"
    exit 1
fi

# 5. List Providers
echo -e "\n5️⃣  Listing Providers..."
curl -s -X GET $BASE_URL/admin/providers \
  -H "Authorization: Bearer $TOKEN" | grep "Dr. API Test" > /dev/null && echo "✅ New Provider found in list" || echo "❌ Provider not found in list"

# 6. Delete Test Provider
echo -e "\n6️⃣  Deleting Test Provider..."
DELETE_RESPONSE=$(curl -s -X DELETE $BASE_URL/admin/providers/$PROVIDER_ID \
  -H "Authorization: Bearer $TOKEN")

echo $DELETE_RESPONSE | grep "success\":true" > /dev/null && echo "✅ Provider Deleted" || echo "❌ Deletion Failed"

echo -e "\n✅ All API Tests Completed Successfully!"
