
-- Step 1: Create a new column of type uuid[] 
ALTER TABLE tricks ADD COLUMN category_ids uuid[];

-- Step 2: Copy existing values from category_id to category_ids (as a single-element array)
UPDATE tricks SET category_ids = ARRAY[category_id] WHERE category_id IS NOT NULL;

-- Step 3: Drop the old column (optional, but recommended for cleanliness)
ALTER TABLE tricks DROP COLUMN category_id;

-- Step 4: Rename the new column to match the original name
ALTER TABLE tricks RENAME COLUMN category_ids TO category_id;
