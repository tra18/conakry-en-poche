import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Phone, Mail, MapPin, CreditCard, CheckCircle } from 'lucide-react';

const BookingSystem = ({ business, onBookingSubmit }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [partySize, setPartySize] = useState(1);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    specialRequests: ''
  });
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Mock available time slots
  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30', '19:00', '19:30', '20:00', '20:30'
  ];

  useEffect(() => {
    if (selectedDate) {
      // Mock: Generate available slots for selected date
      const available = timeSlots.filter(slot => Math.random() > 0.3);
      setAvailableSlots(available);
    }
  }, [selectedDate]);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setSelectedTime('');
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime) {
      alert('Veuillez sélectionner une date et une heure');
      return;
    }

    if (!customerInfo.name || !customerInfo.phone) {
      alert('Veuillez remplir les informations obligatoires');
      return;
    }

    setIsSubmitting(true);

    try {
      const bookingData = {
        businessId: business.id,
        businessName: business.name,
        date: selectedDate,
        time: selectedTime,
        partySize,
        customerInfo,
        status: 'pending',
        timestamp: new Date().toISOString()
      };

      if (onBookingSubmit) {
        await onBookingSubmit(bookingData);
      }

      setBookingConfirmed(true);
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('Erreur lors de la réservation');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    return maxDate.toISOString().split('T')[0];
  };

  if (bookingConfirmed) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center">
        <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
        <h3 className="text-2xl font-semibold text-white mb-2">
          Réservation confirmée !
        </h3>
        <p className="text-white/80 mb-4">
          Votre réservation a été envoyée à {business.name}
        </p>
        <div className="bg-white/5 rounded-xl p-4 mb-6">
          <p className="text-white/90">
            <strong>Date:</strong> {new Date(selectedDate).toLocaleDateString('fr-FR')}
          </p>
          <p className="text-white/90">
            <strong>Heure:</strong> {selectedTime}
          </p>
          <p className="text-white/90">
            <strong>Nombre de personnes:</strong> {partySize}
          </p>
        </div>
        <p className="text-white/70 text-sm">
          Vous recevrez une confirmation par SMS ou email
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
      <h3 className="text-xl font-semibold text-white mb-6">
        Réserver chez {business.name}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Date Selection */}
        <div>
          <label className="block text-white/80 text-sm mb-2">
            <Calendar className="w-4 h-4 inline mr-2" />
            Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            min={getMinDate()}
            max={getMaxDate()}
            className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:bg-white/15 transition-all duration-300"
            required
          />
        </div>

        {/* Time Selection */}
        {selectedDate && (
          <div>
            <label className="block text-white/80 text-sm mb-2">
              <Clock className="w-4 h-4 inline mr-2" />
              Heure
            </label>
            <div className="grid grid-cols-4 gap-2">
              {availableSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => handleTimeSelect(slot)}
                  className={`p-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedTime === slot
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/10 text-white/80 hover:bg-white/20'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Party Size */}
        <div>
          <label className="block text-white/80 text-sm mb-2">
            <Users className="w-4 h-4 inline mr-2" />
            Nombre de personnes
          </label>
          <select
            value={partySize}
            onChange={(e) => setPartySize(parseInt(e.target.value))}
            className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:bg-white/15 transition-all duration-300"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
              <option key={num} value={num} className="bg-gray-800">
                {num} {num === 1 ? 'personne' : 'personnes'}
              </option>
            ))}
          </select>
        </div>

        {/* Customer Information */}
        <div className="space-y-4">
          <h4 className="text-white font-medium">Vos informations</h4>
          
          <div>
            <label className="block text-white/80 text-sm mb-2">Nom complet *</label>
            <input
              type="text"
              name="name"
              value={customerInfo.name}
              onChange={handleInputChange}
              className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-500 focus:bg-white/15 transition-all duration-300"
              placeholder="Votre nom complet"
              required
            />
          </div>

          <div>
            <label className="block text-white/80 text-sm mb-2">
              <Phone className="w-4 h-4 inline mr-2" />
              Téléphone *
            </label>
            <input
              type="tel"
              name="phone"
              value={customerInfo.phone}
              onChange={handleInputChange}
              className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-500 focus:bg-white/15 transition-all duration-300"
              placeholder="+224 XXX XX XX XX"
              required
            />
          </div>

          <div>
            <label className="block text-white/80 text-sm mb-2">
              <Mail className="w-4 h-4 inline mr-2" />
              Email
            </label>
            <input
              type="email"
              name="email"
              value={customerInfo.email}
              onChange={handleInputChange}
              className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-500 focus:bg-white/15 transition-all duration-300"
              placeholder="votre@email.com"
            />
          </div>

          <div>
            <label className="block text-white/80 text-sm mb-2">Demandes spéciales</label>
            <textarea
              name="specialRequests"
              value={customerInfo.specialRequests}
              onChange={handleInputChange}
              className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-500 focus:bg-white/15 transition-all duration-300 resize-none"
              placeholder="Allergies, préférences, etc."
              rows={3}
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || !selectedDate || !selectedTime}
          className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-green-500 to-blue-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
              <span>Réservation en cours...</span>
            </>
          ) : (
            <>
              <CreditCard className="w-5 h-5" />
              <span>Confirmer la réservation</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default BookingSystem;
