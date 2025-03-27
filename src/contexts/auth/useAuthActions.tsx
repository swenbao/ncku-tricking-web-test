
import { toast } from "@/components/ui/use-toast";
import { AppUser } from './types';
import { 
  loginUser, 
  signupUser, 
  updateUserProfile, 
  updateTrickStatus as updateTrickStatusService,
  logoutUser
} from './authService';

export function useAuthActions(
  user: AppUser | null,
  setUser: React.Dispatch<React.SetStateAction<AppUser | null>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      await loginUser(email, password);
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: "Login failed",
        description: error.message || "Could not sign in with those credentials",
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData: Partial<AppUser> & { password: string }) => {
    setLoading(true);
    try {
      await signupUser(userData);
    } catch (error: any) {
      console.error('Signup error:', error);
      toast({
        title: "Signup failed",
        description: error.message || "Could not create your account",
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Logout failed",
        description: "Could not sign you out properly",
        variant: "destructive"
      });
    }
  };

  const updateUser = async (userData: Partial<AppUser>) => {
    if (!user) return;
    
    try {
      // Update user profile in Supabase
      await updateUserProfile(user.id, userData);
      
      // Update local state
      setUser(prev => prev ? { ...prev, ...userData } : null);
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated",
      });
    } catch (error) {
      console.error('Update user error:', error);
      toast({
        title: "Update failed",
        description: "Could not update your profile information",
        variant: "destructive"
      });
    }
  };

  const updateTrickStatus = async (trickId: string, status: 'Started' | 'Completed' | 'Proficient') => {
    if (!user) return;

    try {
      await updateTrickStatusService(user.id, trickId, status);
      
      // Update local state
      const updatedTricks = [...user.completedTricks];
      const existingIndex = updatedTricks.findIndex(t => t.trickId === trickId);
      
      if (existingIndex >= 0) {
        updatedTricks[existingIndex] = { ...updatedTricks[existingIndex], status };
      } else {
        updatedTricks.push({ trickId, status });
      }
      
      setUser(prev => prev ? { ...prev, completedTricks: updatedTricks } : null);
      
      toast({
        title: "Progress updated",
        description: `Trick status updated to ${status}`,
      });
    } catch (error) {
      console.error('Update trick status error:', error);
      toast({
        title: "Update failed",
        description: "Could not update your trick progress",
        variant: "destructive"
      });
    }
  };

  return {
    login,
    signup,
    logout,
    updateUser,
    updateTrickStatus
  };
}
