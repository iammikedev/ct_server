import { Image } from 'primereact/image';

export default function ApplicationLogo(props) {
    return (
        <Image src="/img/logo.png" alt="Image" { ...props } />
    );
}
