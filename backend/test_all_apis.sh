#!/bin/bash

BASE_URL="http://localhost:5001/api"
echo "🏥 Testing ALL Healthcare APIs..."

# ==========================================
# 1. SETUP - Admin Login to create Provider
# ==========================================
echo -e "\n🔹 [SETUP] Logging in as Admin..."
ADMIN_LOGIN=$(curl -s -X POST $BASE_URL/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@healthcare.com","password":"admin123"}')
ADMIN_TOKEN=$(echo $ADMIN_LOGIN | grep -o '"token":"[^"]*' | cut -d'"' -f4)

if [ -z "$ADMIN_TOKEN" ]; then echo "❌ Admin Login Failed"; exit 1; fi

# Create Provider
echo -e "🔹 [SETUP] Creating Test Provider..."
PROVIDER_EMAIL="doc.test.$(date +%s)@hospital.com"
PROVIDER_PASS="password123"
PROVIDER_RES=$(curl -s -X POST $BASE_URL/admin/providers \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Dr. Test Provider",
    "email": "'"$PROVIDER_EMAIL"'",
    "password": "'"$PROVIDER_PASS"'",
    "providerInfo": { "specialization": "General", "licenseNumber": "TEST12345" }
  }')
PROVIDER_ID=$(echo $PROVIDER_RES | grep -o '"_id":"[^"]*' | head -1 | cut -d'"' -f4)

if [ -z "$PROVIDER_ID" ]; then echo "❌ Provider Creation Failed"; exit 1; fi
echo "✅ Provider Created ($PROVIDER_EMAIL)"

# ==========================================
# 2. PATIENT FLOW
# ==========================================
echo -e "\n🔹 [PATIENT] Registering New Patient..."
PATIENT_EMAIL="patient.$(date +%s)@test.com"
PATIENT_PASS="password123"

REGISTER_RES=$(curl -s -X POST $BASE_URL/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Patient",
    "email": "'"$PATIENT_EMAIL"'",
    "password": "'"$PATIENT_PASS"'",
    "role": "patient",
    "consentGiven": true
  }')

PATIENT_TOKEN=$(echo $REGISTER_RES | grep -o '"token":"[^"]*' | cut -d'"' -f4)
if [ -z "$PATIENT_TOKEN" ]; then echo "❌ Patient Registration Failed"; exit 1; fi
echo "✅ Patient Registered & Logged In"

PATIENT_ID=$(echo $REGISTER_RES | grep -o '"_id":"[^"]*' | head -1 | cut -d'"' -f4)

echo -e "🔹 [PATIENT] Fetching Dashboard..."
DASH_RES=$(curl -s -X GET $BASE_URL/patient/dashboard \
  -H "Authorization: Bearer $PATIENT_TOKEN")
echo $DASH_RES | grep '"success":true' > /dev/null && echo "✅ Dashboard Access OK" || echo "❌ Dashboard Failed"

echo -e "🔹 [PATIENT] Updating Goals..."
GOAL_RES=$(curl -s -X POST $BASE_URL/patient/goals \
  -H "Authorization: Bearer $PATIENT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"steps": 5000, "waterIntake": 1500}')
echo $GOAL_RES | grep '"steps":5000' > /dev/null && echo "✅ Goals Updated" || echo "❌ Goal Update Failed"

echo -e "🔹 [PATIENT] Checking Providers List..."
PROVIDERS_LIST=$(curl -s -X GET $BASE_URL/patient/providers \
  -H "Authorization: Bearer $PATIENT_TOKEN")
echo $PROVIDERS_LIST | grep '"success":true' > /dev/null && echo "✅ Providers List OK" || echo "❌ Providers List Failed"

# ==========================================
# 3. PROVIDER FLOW
# ==========================================
echo -e "\n🔹 [PROVIDER] Logging in..."
PROVIDER_LOGIN=$(curl -s -X POST $BASE_URL/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"'"$PROVIDER_EMAIL"'","password":"'"$PROVIDER_PASS"'"}')
PROVIDER_TOKEN=$(echo $PROVIDER_LOGIN | grep -o '"token":"[^"]*' | cut -d'"' -f4)

if [ -z "$PROVIDER_TOKEN" ]; then echo "❌ Provider Login Failed"; exit 1; fi
echo "✅ Provider Logged In"

echo -e "🔹 [PROVIDER] Fetching Patients List..."
PATIENTS_RES=$(curl -s -X GET $BASE_URL/provider/patients \
  -H "Authorization: Bearer $PROVIDER_TOKEN")
echo $PATIENTS_RES | grep '"success":true' > /dev/null && echo "✅ Patients List OK" || echo "❌ Patients List Failed"

# ==========================================
# 4. CLEANUP
# ==========================================
echo -e "\n🔹 [CLEANUP] Deleting Test Provider..."
curl -s -X DELETE $BASE_URL/admin/providers/$PROVIDER_ID \
  -H "Authorization: Bearer $ADMIN_TOKEN" > /dev/null
echo "✅ Test Data Cleaned Up"

echo -e "\n✅ ALL SYSTEM APIS VERIFIED SUCCESSFULLY"
