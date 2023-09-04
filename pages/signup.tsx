import { useState } from 'react';

const Signup: React.FC = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [telegramHandle, setTelegramHandle] = useState('');
    const [business, setBusiness] = useState('');
    const [location, setLocation] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async () => {
        try {
    
        } catch (error) {
    
        } 
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-96">
            <h1 className="text-2xl font-semibold mb-4">Sign Up</h1>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                    required
                    type="text"
                    className="input-field"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    required
                    type="email"
                    className="input-field"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                    required
                    type="text"
                    className="input-field"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
            </div>
            <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
                required
                type="password"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            </div>
            <button
            className="w-full bg-emerald-500 hover:bg-emerald-700 text-white py-2 rounded"
            onClick={handleSignup}
            >
            Sign Up
            </button>
        </div>
    </div>
  );
};

export default Signup;
