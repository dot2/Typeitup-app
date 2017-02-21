Template.expressCheckout.onCreated( () => {
  let template = Template.instance();

  template.selectedService  = new ReactiveVar( false );
  template.processing       = new ReactiveVar( false );

  template.checkout = StripeCheckout.configure({
    key: Meteor.settings.public.stripe.testPublishableKey,
    image: 'http://typeitup.co/images/icons/favicon.png',
    locale: 'auto',
    token( token ) {
      let service = template.selectedService.get(),
          charge  = {
            amount: token.amount || service.amount,
            currency: token.currency || 'usd',
            source: token.id,
            description: token.description || service.description,
            receipt_email: token.email
          };

      Meteor.call( 'processPayment', charge, ( error, response ) => {
        if ( error ) {
          template.processing.set( false );
          Bert.alert( error.reason, 'danger' );
        } else {
          Bert.alert( 'Thanks! You\'re expedited process is being added :)', 'success' );
        }
      });
    },
    closed() {
      template.processing.set( false );
    }
  });
});

Template.expressCheckout.helpers({
  processing() {
    return Template.instance().processing.get();
  },
  paymentSucceeded() {
    return Template.instance().paymentSucceeded.get();
  }
});

Template.expressCheckout.events({
  'click [data-service]' ( event, template ) {
    const pricing = {
      '6-day': {
        amount: 200,
        description: "6 Days"
      },
      '5-day': {
        amount: 400,
        description: "5 Days"
      },
      '4-day': {
        amount: 600,
        description: "4 Days"
      },
      '3-day': {
        amount: 1400,
        description: "3 Days"
      },
      '2-day': {
        amount: 1700,
        description: "2 Days"
      },
      '1-day': {
        amount: 2000,
        description: "1 Day"
      },

    };

    let service = pricing[ event.target.dataset.service ];

    template.selectedService.set( service );
    template.processing.set( true );

    template.checkout.open({
      name: 'Type It Up - Extra Pages',
      description: service.description,
      amount: service.amount,
      bitcoin: true
    });
  }
});
