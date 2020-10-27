import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SplitCardForm from './SplitCardForm';
import SimpleCardForm from './SimpleCardForm';

const stripePromise = loadStripe('pk_test_51HZpJFJoQ8SSIU5q1ghSmq5rsrR3eb2gWA2ZIWRoq4WpwVuDh29xJ03HzrAbZ1aF4v2aAtL9CtqE7M8csgV1v2X800ZNgyinbf');

const ProcessPayment = ({handlePayment}) => {
    return (

        <Elements stripe={stripePromise}>
            <SimpleCardForm handlePayment={handlePayment}></SimpleCardForm>
        </Elements>
    );
};

export default ProcessPayment; 