import { Suspense } from 'react';
import Loader from '../loader';

const Loadable = (Component:any) => (props:any) => (
  <Suspense fallback={<Loader />}>
    <Component {...props} />
  </Suspense>
);

export default Loadable;
