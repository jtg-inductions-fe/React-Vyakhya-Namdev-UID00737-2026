import { Header } from 'components/Header';

import heroImage from '@assets/image/heroImage.png';

import { HeroContainer, HeroImage } from './LandingPage.styles';

/**
 * Landing page of the application.
 * @description
 * Renders the application header along with the hero section
 * that introduces the GitHub developer discovery feature.
 */
const LandingPage = () => (
    <div>
        <Header />
        <main>
            <HeroContainer>
                <HeroImage src={heroImage} alt="Discover GitHub developers" />
            </HeroContainer>
        </main>
    </div>
);

export default LandingPage;
