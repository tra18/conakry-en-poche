import React, { useState } from 'react';
import { CreditCard, Smartphone, Shield, CheckCircle, AlertCircle } from 'lucide-react';

const PaymentSystem = ({ amount, businessName, onPaymentSuccess, onPaymentError }) => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentData, setPaymentData] = useState({
    phone: '',
    amount: amount || 0,
    description: `Paiement pour ${businessName}`
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const paymentMethods = [
    {
      id: 'orange_money',
      name: 'Orange Money',
      icon: '🟠',
      description: 'Paiement via Orange Money',
      color: 'orange'
    },
    {
      id: 'mtn_money',
      name: 'MTN Money',
      icon: '🟡',
      description: 'Paiement via MTN Money',
      color: 'yellow'
    },
    {
      id: 'card',
      name: 'Carte Bancaire',
      icon: '💳',
      description: 'Visa, Mastercard, etc.',
      color: 'blue'
    }
  ];

  const handlePaymentMethodSelect = (method) => {
    setPaymentMethod(method);
    setPaymentData(prev => ({
      ...prev,
      method
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const processPayment = async () => {
    if (!paymentMethod) {
      alert('Veuillez sélectionner un mode de paiement');
      return;
    }

    if (paymentMethod !== 'card' && !paymentData.phone) {
      alert('Veuillez saisir votre numéro de téléphone');
      return;
    }

    setIsProcessing(true);
    setPaymentStatus(null);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Mock payment success/failure
      const isSuccess = Math.random() > 0.2; // 80% success rate

      if (isSuccess) {
        setPaymentStatus('success');
        if (onPaymentSuccess) {
          onPaymentSuccess({
            transactionId: `TXN_${Date.now()}`,
            amount: paymentData.amount,
            method: paymentMethod,
            timestamp: new Date().toISOString()
          });
        }
      } else {
        setPaymentStatus('error');
        if (onPaymentError) {
          onPaymentError('Échec du paiement. Veuillez réessayer.');
        }
      }
    } catch (error) {
      setPaymentStatus('error');
      if (onPaymentError) {
        onPaymentError('Erreur lors du traitement du paiement');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'GNF',
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (paymentStatus === 'success') {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center">
        <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
        <h3 className="text-2xl font-semibold text-white mb-2">
          Paiement réussi !
        </h3>
        <p className="text-white/80 mb-4">
          Votre paiement de {formatAmount(paymentData.amount)} a été traité avec succès
        </p>
        <div className="bg-white/5 rounded-xl p-4 mb-6">
          <p className="text-white/90 text-sm">
            <strong>Transaction ID:</strong> TXN_{Date.now()}
          </p>
          <p className="text-white/90 text-sm">
            <strong>Méthode:</strong> {paymentMethods.find(m => m.id === paymentMethod)?.name}
          </p>
          <p className="text-white/90 text-sm">
            <strong>Date:</strong> {new Date().toLocaleString('fr-FR')}
          </p>
        </div>
        <p className="text-white/70 text-sm">
          Vous recevrez un reçu par SMS
        </p>
      </div>
    );
  }

  if (paymentStatus === 'error') {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center">
        <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
        <h3 className="text-2xl font-semibold text-white mb-2">
          Paiement échoué
        </h3>
        <p className="text-white/80 mb-6">
          Une erreur s'est produite lors du traitement de votre paiement
        </p>
        <button
          onClick={() => {
            setPaymentStatus(null);
            setPaymentMethod('');
          }}
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors duration-200"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
        <CreditCard className="w-6 h-6 mr-2 text-blue-400" />
        Paiement sécurisé
      </h3>

      {/* Amount Display */}
      <div className="bg-white/5 rounded-xl p-4 mb-6 text-center">
        <p className="text-white/70 text-sm mb-1">Montant à payer</p>
        <p className="text-3xl font-bold text-white">
          {formatAmount(paymentData.amount)}
        </p>
        <p className="text-white/60 text-sm mt-1">
          {paymentData.description}
        </p>
      </div>

      {/* Payment Methods */}
      <div className="mb-6">
        <h4 className="text-white font-medium mb-4">Choisissez votre mode de paiement</h4>
        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => handlePaymentMethodSelect(method.id)}
              className={`w-full p-4 rounded-xl border-2 transition-all duration-200 ${
                paymentMethod === method.id
                  ? 'border-blue-500 bg-blue-500/20'
                  : 'border-white/20 bg-white/5 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center space-x-4">
                <span className="text-2xl">{method.icon}</span>
                <div className="flex-1 text-left">
                  <p className="text-white font-medium">{method.name}</p>
                  <p className="text-white/60 text-sm">{method.description}</p>
                </div>
                {paymentMethod === method.id && (
                  <CheckCircle className="w-6 h-6 text-blue-400" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Payment Form */}
      {paymentMethod && (
        <div className="mb-6">
          {paymentMethod !== 'card' && (
            <div className="mb-4">
              <label className="block text-white/80 text-sm mb-2">
                <Smartphone className="w-4 h-4 inline mr-2" />
                Numéro de téléphone
              </label>
              <input
                type="tel"
                name="phone"
                value={paymentData.phone}
                onChange={handleInputChange}
                placeholder="+224 XXX XX XX XX"
                className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-500 focus:bg-white/15 transition-all duration-300"
                required
              />
            </div>
          )}

          {paymentMethod === 'card' && (
            <div className="space-y-4">
              <div>
                <label className="block text-white/80 text-sm mb-2">Numéro de carte</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-500 focus:bg-white/15 transition-all duration-300"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 text-sm mb-2">Date d'expiration</label>
                  <input
                    type="text"
                    placeholder="MM/AA"
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-500 focus:bg-white/15 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm mb-2">CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-500 focus:bg-white/15 transition-all duration-300"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Security Notice */}
      <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4 mb-6">
        <div className="flex items-center">
          <Shield className="w-5 h-5 text-green-400 mr-2" />
          <p className="text-green-400 text-sm">
            Paiement 100% sécurisé et crypté
          </p>
        </div>
      </div>

      {/* Pay Button */}
      <button
        onClick={processPayment}
        disabled={isProcessing || !paymentMethod}
        className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-green-500 to-blue-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
      >
        {isProcessing ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
            <span>Traitement en cours...</span>
          </>
        ) : (
          <>
            <CreditCard className="w-5 h-5" />
            <span>Payer {formatAmount(paymentData.amount)}</span>
          </>
        )}
      </button>
    </div>
  );
};

export default PaymentSystem;
