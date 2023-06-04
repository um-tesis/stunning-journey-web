import {useState} from 'react';
import toast from 'react-hot-toast';

type CopiedValue = string | null;
type CopyFn = (text: string) => Promise<boolean>; // Return success

function useCopyToClipboard(): [CopiedValue, CopyFn] {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null);

  const copy: CopyFn = async (text) => {
    if (!navigator?.clipboard) {
      toast.error('No se admite el portapapeles');
      return false;
    }

    // Try to save to clipboard then save it in the state if worked
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      toast.success('Copiado al portapapeles!');
      return true;
    } catch (error) {
      toast.error('Error de copiado al portapapeles');
      setCopiedText(null);
      return false;
    }
  };

  return [copiedText, copy];
}

export default useCopyToClipboard;
