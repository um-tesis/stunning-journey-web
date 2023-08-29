/* eslint-disable @next/next/no-img-element */
import React, {ChangeEvent, useState} from 'react';
import {Grid, TextField, CircularProgress} from '@mui/material';
import styles from './styles.module.scss';
import PrimaryButton from '../primary-button';

interface ImageInputProps {
  imageUrl?: string;
  onChange: (value: string) => void;
  label?: string;
}

function ImageInput({imageUrl, onChange, label}: ImageInputProps) {
  const [loading, setLoading] = useState(false);

  const handleFileInputChange = async (event: any) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      try {
        setLoading(true);

        const response = await fetch('/api/getCoverPhotoUploadUrl?fileType=' + file.type);
        const {uploadURL, key} = await response.json();

        await fetch(uploadURL, {
          method: 'PUT',
          body: file,
          headers: {
            'Content-Type': file.type,
          },
        });

        onChange(`https://projects-cover-photos.s3.amazonaws.com/${key}`);
      } catch (error) {
        console.error('File upload failed:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item>
        <TextField
          className={styles.textField}
          disabled
          label={label || 'URL de la imagen'}
          variant='outlined'
          value={imageUrl}
          onChange={(event) => onChange(event.target.value)}
        />
      </Grid>
      <Grid item>
        <PrimaryButton variant='contained' component='label' disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Cargar'}
          <input type='file' hidden accept='image/*' onChange={handleFileInputChange} />
        </PrimaryButton>
      </Grid>
      {imageUrl && (
        <Grid item xs={12}>
          <img className={styles.previewImage} src={imageUrl} alt='Preview' />
        </Grid>
      )}
    </Grid>
  );
}

export default ImageInput;
