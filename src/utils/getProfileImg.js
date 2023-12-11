export default function getProfileImg(fileUrl) {
    if (!fileUrl) {
        return 'https://ntwnhbkevnfiqumjprlt.supabase.co/storage/v1/object/sign/avatars/0.20814066527180985.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXJzLzAuMjA4MTQwNjY1MjcxODA5ODUucG5nIiwiaWF0IjoxNzAyMzE1MjU0LCJleHAiOjE3NjUzODcyNTR9.M-0at3OO87g3tUJWmPn9mDOLOGntbLMtZQBnCiXW-Ck&t=2023-12-11T17%3A20%3A50.844Z';
    }
    return `https://ntwnhbkevnfiqumjprlt.supabase.co/storage/v1/object/public/avatars/${fileUrl}`;
}
