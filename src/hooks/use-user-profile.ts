import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type Profile = Database['public']['Tables']['profiles']['Row'];

export const useUserProfile = () => {
	const [profile, setProfile] = useState<Profile | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				setLoading(true);
				setError(null);

				// Get current user
				const { data: { user }, error: userError } = await supabase.auth.getUser();

				if (userError) throw userError;
				if (!user) {
					setProfile(null);
					setLoading(false);
					return;
				}

				// Fetch profile from database
				const { data, error: profileError } = await supabase
					.from('profiles')
					.select('*')
					.eq('id', user.id)
					.single();

				if (profileError) throw profileError;

				setProfile(data);
			} catch (err) {
				setError(err instanceof Error ? err : new Error('Failed to fetch profile'));
				setProfile(null);
			} finally {
				setLoading(false);
			}
		};

		fetchProfile();

		// Subscribe to auth state changes
		const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
			if (session?.user) {
				fetchProfile();
			} else {
				setProfile(null);
				setLoading(false);
			}
		});

		return () => {
			subscription.unsubscribe();
		};
	}, []);

	const updateProfile = async (updates: Database['public']['Tables']['profiles']['Update']) => {
		try {
			const { data: { user } } = await supabase.auth.getUser();
			if (!user) throw new Error('No user logged in');

			const { data, error } = await supabase
				.from('profiles')
				.update(updates)
				.eq('id', user.id)
				.select()
				.single();

			if (error) throw error;

			setProfile(data);
			return { data, error: null };
		} catch (err) {
			const error = err instanceof Error ? err : new Error('Failed to update profile');
			return { data: null, error };
		}
	};

	return {
		profile,
		loading,
		error,
		updateProfile,
	};
};
