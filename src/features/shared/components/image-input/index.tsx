/* eslint-disable @next/next/no-img-element */
import React, {ChangeEvent} from 'react';
import {TextField} from '@mui/material';
import styles from './styles.module.scss';
import PrimaryButton from '../primary-button';

interface ImageInputProps {
  imageUrl?: string;
  onChange: (value: string) => void;
  label?: string;
}

function ImageInput({imageUrl, onChange, label}: ImageInputProps) {
  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.container}>
      <TextField
        className={styles.textField}
        label={label || 'Image URL'}
        variant='outlined'
        value={imageUrl}
        onChange={(event) => onChange(event.target.value)}
      />
      <PrimaryButton className={styles.uploadButton} variant='contained' component='label'>
        Upload
        <input type='file' hidden accept='image/*' onChange={handleFileInputChange} />
      </PrimaryButton>
      {imageUrl && <img className={styles.previewImage} src={imageUrl} alt='Preview' />}
    </div>
  );
}

export default ImageInput;
