import {useRouter} from 'next/router';
import Error from 'next/error';

function ErrorPage404() {
  const router = useRouter();
  return (
    <div className='not-found'>
      <Error statusCode={404} />
      <div className='links'>
        <a href='#' onClick={() => router.back()}>
          Go back
        </a>
      </div>
    </div>
  );
}

export default ErrorPage404;
