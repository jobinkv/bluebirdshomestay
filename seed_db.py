import os
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

url = os.environ.get("db_url")
key = os.environ.get("db_apikey")

if not url or not key:
    print("Error: db_url or db_apikey not found in .env file")
    exit(1)

supabase: Client = create_client(url, key)

# Data to seed
DEFAULT_ROOMS = {
    '101': {
        'name': 'Deluxe Room 101',
        'size': '14 × 16 ft',
        'bed_size': '6 × 7 ft',
        'weekday_price': 2000,
        'weekend_price': 2500,
        'image_main': 'https://lh3.googleusercontent.com/u/0/d/101-main-id=w1000', # Simplified for seeding
        'image_window': 'placeholder-window.jpg',
        'amenities': ['Air Conditioning', 'King Size Bed', 'Private Bathroom', 'Hot Water', '64" Smart TV', 'Music System']
    },
    '102': {
        'name': 'Deluxe Room 102',
        'size': '14 × 16 ft',
        'bed_size': '6 × 7 ft',
        'weekday_price': 2000,
        'weekend_price': 2500,
        'image_main': 'https://lh3.googleusercontent.com/u/0/d/102-main-id=w1000',
        'image_window': 'placeholder-window.jpg',
        'amenities': ['Air Conditioning', 'King Size Bed', 'Private Bathroom', 'Hot Water', '64" Smart TV', 'Music System']
    },
    '103': {
        'name': 'Deluxe Room 103',
        'size': '14 × 16 ft',
        'bed_size': '6 × 7 ft',
        'weekday_price': 2000,
        'weekend_price': 2500,
        'image_main': 'https://lh3.googleusercontent.com/u/0/d/103-main-id=w1000',
        'image_window': 'placeholder-window.jpg',
        'amenities': ['Air Conditioning', 'King Size Bed', 'Private Bathroom', 'Hot Water', '64" Smart TV', 'Music System']
    },
    '104': {
        'name': 'Deluxe Room 104',
        'size': '14 × 16 ft',
        'bed_size': '6 × 7 ft',
        'weekday_price': 2000,
        'weekend_price': 2500,
        'image_main': 'https://lh3.googleusercontent.com/u/0/d/104-main-id=w1000',
        'image_window': 'placeholder-window.jpg',
        'amenities': ['Air Conditioning', 'King Size Bed', 'Private Bathroom', 'Hot Water', '64" Smart TV', 'Music System']
    },
    '106': {
        'name': 'Deluxe Room 106',
        'size': '14 × 16 ft',
        'bed_size': '6 × 7 ft',
        'weekday_price': 2000,
        'weekend_price': 2500,
        'image_main': 'https://lh3.googleusercontent.com/u/0/d/106-main-id=w1000',
        'image_window': 'placeholder-window.jpg',
        'amenities': ['Air Conditioning', 'King Size Bed', 'Private Bathroom', 'Hot Water', '64" Smart TV', 'Music System']
    },
    '107': {
        'name': 'Deluxe Room 107',
        'size': '14 × 16 ft',
        'bed_size': '6 × 7 ft',
        'weekday_price': 2000,
        'weekend_price': 2500,
        'image_main': 'https://lh3.googleusercontent.com/u/0/d/107-main-id=w1000',
        'image_window': 'placeholder-window.jpg',
        'amenities': ['Air Conditioning', 'King Size Bed', 'Private Bathroom', 'Hot Water', '64" Smart TV', 'Music System']
    },
    '108': {
        'name': 'Room 108 - Dormitory',
        'size': '20 × 24 ft',
        'bed_size': '3 × 6 ft (each)',
        'weekday_price': 1500,
        'weekend_price': 1800,
        'image_main': 'placeholder-dormitory.jpg',
        'image_window': 'placeholder-window.jpg',
        'amenities': ['Air Conditioning', 'Multiple Beds', 'Shared Bathroom', 'Hot Water', '64" Smart TV', 'Music System']
    }
}

def seed_database():
    print(f"Connecting to Supabase at {url}...")
    
    rows = []
    for room_id, data in DEFAULT_ROOMS.items():
        rows.append({
            "id": room_id,
            "name": data["name"],
            "size": data["size"],
            "bed_size": data["bed_size"],
            "weekday_price": data["weekday_price"],
            "weekend_price": data["weekend_price"],
            "image_main": data["image_main"],
            "image_window": data["image_window"],
            "amenities": data["amenities"]
        })

    try:
        print(f"Upserting {len(rows)} rooms...")
        result = supabase.table("rooms").upsert(rows).execute()
        print("Successfully seeded database!")
        print(result)
    except Exception as e:
        print(f"Error seeding database: {e}")
        print("\nTIP: Make sure you have created the 'rooms' table in Supabase with the correct columns:")
        print("id (text, primary key), name (text), size (text), bed_size (text), weekday_price (numeric), weekend_price (numeric), image_main (text), image_window (text), amenities (text[])")

if __name__ == "__main__":
    seed_database()
