import './App.css';
import { TwitterFollowCard } from './TwitterFllowCard';

export function App() {
	const formatUserName = (userName) => `@${userName}`;
	const vxder = { inicialIsFollowing: true, username: 'vxder', name: 'VenderHart' }
	return (
		<section className='App'>
			<TwitterFollowCard formatUserName={formatUserName} inicialIsFollowing username='midudev' name='Miguel Angel Duran' />
			<TwitterFollowCard formatUserName={formatUserName} inicialIsFollowing={false} username='aparicio' name='Alberto Aparicio Escobedo' />
			<TwitterFollowCard formatUserName={formatUserName} {...vxder} /> {/* no buena practica */}
			<TwitterFollowCard formatUserName={formatUserName} inicialIsFollowing username='elonmusk' >
				Elon Musk
			</TwitterFollowCard>
		</section>
	)
}