import { useEffect, useState } from 'react';
import supabase from '../supabase/database';

export default function Avatar({ url, size, onUpload }) {
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [uploading, setUploading] = useState(false);

    // funzione che carica l'immagine nello storage...
    async function downloadImage(path) {
        try {
            const { data, error } = await supabase.storage
                .from('avatars')
                .download(path);
            if (error) {
                throw error;
            }
            const url = URL.createObjectURL(data);
            setAvatarUrl(url);
        } catch (error) {
            console.log('Error downloading image: ', error.message);
        }
    }

    // se url cambia invoca la funzione downloadImage...
    useEffect(() => {
        if (url) downloadImage(url);
    }, [url]);

    // funzione che controlla il path dell'immagine da inserire...
    async function uploadAvatar(event) {
        try {
            setUploading(true);

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('You must select an image to upload.');
            }

            const file = event.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            onUpload(event, filePath);
        } catch (error) {
            // eslint-disable-next-line no-alert
            alert(error.message);
        } finally {
            setUploading(false);
        }
    }

    return (
        <div>
            {avatarUrl ? (
                <img
                    src={avatarUrl}
                    alt="Avatar"
                    className="avatar image rounded-4"
                    style={{
                        height: size,
                        width: size,
                        boxShadow: '0 0 10px #3ecf8e',
                    }}
                />
            ) : (
                <div
                    className="avatar no-image rounded-4"
                    style={{
                        height: size,
                        width: size,
                        boxShadow: '0 0 10px #3ecf8e',
                    }}
                />
            )}
            <div style={{ width: size }}>
                <button
                    className='btn btn-link mb-3 ps-0'
                    type="button"
                    style={{
                        marginTop: '10px', color: "#3ecf8e"
                    }}
                >
                    {uploading ? 'Uploading ...' : 'Upload'}
                </button>
                <input
                    className='form-control'
                    type="file"
                    id="single"
                    accept="image/*"
                    onChange={uploadAvatar}
                    disabled={uploading}
                />
            </div>
        </div>
    );
}