
import { useState, useContext, createContext, useEffect, ReactNode } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

// Mock user data for demonstration
const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Dr. Smith',
    email: 'admin@entnt.com',
    role: 'admin'
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'patient@entnt.com',
    role: 'patient',
    patientId: 'p1'
  },
  {
    id: '2',
    name: 'Jane Doe',
    role: 'patient',
    email: 'jane@entnt.com',
    patientId: 'p1'  
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    // Mock authentication
    const foundUser = MOCK_USERS.find(u => u.email === email);
    console.log('Found user:', foundUser);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
    } else {
      throw new Error('Invalid credentials');
    }
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
