const SUPABASE_URL = 'https://qyobsthtlnmvrepjloov.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF5b2JzdGh0bG5tdnJlcGpsb292Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQ4MTQ0NzYsImV4cCI6MTk4MDM5MDQ3Nn0.kN-7uyBTry1GYMZAcOzgg2YnnO34AXRW8v9EMMXrCZI';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

/* Data functions */

export async function createPlace(place) {
    return await client.from('places').insert(place).single();
}

export async function getPlaces(name) {
    let query = client.from('places').select('*').limit(200);

    if (name) {
        query = query.ilike('name', `%${name}%`);
    }

    return await query;
}

export async function getPlace(id) {
    return await client
        .from('places')
        .select('*, comments(*)')
        .eq('id', id)
        .order('created_at', { foreignTable: 'comments', ascending: false })
        .single();
}

const obj = {
    id: 3,
    name: 'Spooky Halloween',
    description: 'description',
    created_at: 'timestamp',
    image_url: 'https://',
    category: 'nature',
    user_id: '32fd3-343gv67',
    comments: [
        {
            id: 23,
            created_at: 'timestamp',
            text: 'this is my comment',
            user_id: '34ff3_34f',
            place_id: 3,
        },
    ],
};

export async function createComment(comment) {
    return client.from('comments').insert(comment).single();
}

/* Storage Functions */

export async function uploadImage(bucketName, imagePath, imageFile) {
    // we can use the storage bucket to upload the image,
    // then use it to get the public URL
    const bucket = client.storage.from(bucketName);

    const response = await bucket.upload(imagePath, imageFile, {
        cacheControl: '3600',
        // in this case, we will _replace_ any
        // existing file with same name.
        upsert: true,
    });

    if (response.error) {
        // eslint-disable-next-line no-console
        console.log(response.error);
        return null;
    }

    // Construct the URL to this image:
    const url = `${SUPABASE_URL}/storage/v1/object/public/${response.data.Key}`;
    // URL Looks like:
    // https://nwxkvnsiwauieanvbiri.supabase.co/storage/v1/object/public/images/folder/984829079656/image.jpeg

    return url;
}
