
import { useState } from 'react';
import { Ticket, Car, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ParkingTicket {
  id: string;
  vehicleNumber: string;
  driverName: string;
  entryTime: Date;
  duration: number;
  spaceNumber: string;
}

export const TicketingSystem = () => {
  const [formData, setFormData] = useState({
    vehicleNumber: '',
    driverName: '',
    duration: '2',
  });
  const [generatedTicket, setGeneratedTicket] = useState<ParkingTicket | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const generateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const ticket: ParkingTicket = {
      id: `PKT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      vehicleNumber: formData.vehicleNumber,
      driverName: formData.driverName,
      entryTime: new Date(),
      duration: parseInt(formData.duration),
      spaceNumber: `A-${Math.floor(Math.random() * 50) + 1}`,
    };

    setGeneratedTicket(ticket);
    setIsGenerating(false);
    setFormData({ vehicleNumber: '', driverName: '', duration: '2' });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <Ticket className="text-purple-400" />
          Digital Parking Tickets
        </h2>
        <p className="text-slate-300">Generate instant parking tickets with QR codes</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Ticket Generation Form */}
        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Car className="text-purple-400" size={20} />
              Vehicle Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={generateTicket} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="vehicleNumber" className="text-slate-300">
                  Vehicle Number
                </Label>
                <Input
                  id="vehicleNumber"
                  name="vehicleNumber"
                  value={formData.vehicleNumber}
                  onChange={handleInputChange}
                  placeholder="ABC-1234"
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="driverName" className="text-slate-300">
                  Driver Name
                </Label>
                <Input
                  id="driverName"
                  name="driverName"
                  value={formData.driverName}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration" className="text-slate-300">
                  Parking Duration (hours)
                </Label>
                <Input
                  id="duration"
                  name="duration"
                  type="number"
                  min="1"
                  max="24"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="bg-slate-700/50 border-slate-600 text-white"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isGenerating}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                {isGenerating ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Generating Ticket...
                  </div>
                ) : (
                  'Generate Parking Ticket'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Generated Ticket Display */}
        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Ticket className="text-purple-400" size={20} />
              Generated Ticket
            </CardTitle>
          </CardHeader>
          <CardContent>
            {generatedTicket ? (
              <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/10 border border-purple-500/30 rounded-xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">ParkVista Ticket</h3>
                  <CheckCircle className="text-green-400" size={24} />
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Ticket ID:</span>
                    <span className="text-white font-mono">{generatedTicket.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Vehicle:</span>
                    <span className="text-white">{generatedTicket.vehicleNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Driver:</span>
                    <span className="text-white">{generatedTicket.driverName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Space:</span>
                    <span className="text-white">{generatedTicket.spaceNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Entry Time:</span>
                    <span className="text-white">{generatedTicket.entryTime.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Duration:</span>
                    <span className="text-white">{generatedTicket.duration} hours</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-purple-500/30">
                  <div className="w-24 h-24 bg-white rounded-lg mx-auto flex items-center justify-center">
                    <div className="text-xs text-black text-center">
                      QR Code<br />
                      <Clock size={16} className="mx-auto mt-1" />
                    </div>
                  </div>
                  <p className="text-center text-slate-300 text-xs mt-2">
                    Scan to validate parking
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-400">
                <Ticket size={48} className="mx-auto mb-4 opacity-50" />
                <p>Fill out the form to generate a parking ticket</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
