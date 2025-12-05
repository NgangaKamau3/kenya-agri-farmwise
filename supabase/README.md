# Backend Authentication Setup - SQL Instructions

This document provides step-by-step instructions to run the SQL migration in your Supabase project.

## Option 1: Using Supabase Dashboard (Recommended for Quick Setup)

1. **Open Supabase Dashboard**
   - Go to [https://app.supabase.com](https://app.supabase.com)
   - Select your project: `xpdllghezvpnedfbunxo`

2. **Navigate to SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New query"

3. **Copy and Run Migration**
   - Open the file: `supabase/migrations/001_create_profiles_table.sql`
   - Copy the entire contents
   - Paste into the SQL Editor
   - Click "Run" button (or press Ctrl+Enter)

4. **Verify Success**
   - You should see "Success. No rows returned" message
   - Navigate to "Table Editor" in the sidebar
   - You should see a new table called `profiles`

## Option 2: Using Supabase CLI (For Local Development)

### Prerequisites
```bash
# Install Supabase CLI if not already installed
npm install -g supabase
```

### Steps

1. **Initialize Supabase in your project** (if not already done)
```bash
cd c:\Users\lenovo\kenya-agri-farmwise
supabase init
```

2. **Link to your remote project**
```bash
supabase link --project-ref xpdllghezvpnedfbunxo
```

3. **Run the migration**
```bash
supabase db push
```

## Verification Steps

After running the migration, verify everything is set up correctly:

### 1. Check Tables
- Go to Supabase Dashboard → Table Editor
- Confirm `profiles` table exists with these columns:
  - id (uuid, primary key)
  - full_name (text)
  - phone (text, nullable)
  - role (user_role enum)
  - county (text, nullable)
  - avatar_url (text, nullable)
  - bio (text, nullable)
  - created_at (timestamptz)
  - updated_at (timestamptz)

### 2. Check RLS Policies
- Go to Supabase Dashboard → Authentication → Policies
- Confirm 3 policies exist on `profiles` table:
  - "Users can view their own profile" (SELECT)
  - "Users can insert their own profile" (INSERT)
  - "Users can update their own profile" (UPDATE)

### 3. Check Triggers
- Go to Supabase Dashboard → Database → Triggers
- Confirm these triggers exist:
  - `on_auth_user_created` - Creates profile when user signs up
  - `update_profiles_updated_at` - Updates timestamp on profile changes

### 4. Check Functions
- Go to Supabase Dashboard → Database → Functions
- Confirm these functions exist:
  - `handle_new_user()` - Handles automatic profile creation
  - `update_updated_at_column()` - Updates timestamp

## Troubleshooting

### Error: "relation auth.users does not exist"
- This means you're not connected to the right database
- Make sure you're running the SQL in your Supabase project, not a local database

### Error: "type user_role already exists"
- The migration has already been run
- You can safely ignore this or drop the existing type first

### Error: "permission denied"
- Make sure you're logged in as the project owner
- Check that you have the correct project selected

## Next Steps

After successfully running the migration:
1. Test the sign-up flow in your application
2. Verify that profiles are created automatically
3. Check that RLS policies prevent unauthorized access
