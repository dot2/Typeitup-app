Template.uploadSection.onCreated( () => {
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
          Bert.alert( 'Thanks! You\'re pages are being added :)', 'success' );
        }
      });
    },
    closed() {
      template.processing.set( false );
    }
  });
});

Template.uploadSection.helpers({
  processing() {
    return Template.instance().processing.get();
  },
  paymentSucceeded() {
    return Template.instance().paymentSucceeded.get();
  }
});

Template.uploadSection.events({
  'click [data-service]' ( event, template ) {
    const pricing = {
      '1-page': {
        amount: 135,
        description: "1 Extra Page"
      },
      '2-page': {
        amount: 270,
        description: "2 Extra Pages"
      },
      '3-page': {
        amount: 405,
        description: "3 Extra Pages"
      },
      '4-page': {
        amount: 540,
        description: "4 Extra Pages"
      },
      '5-page': {
        amount: 675,
        description: "5 Extra Pages"
      },
      '6-page': {
        amount: 810,
        description: "6 Extra Pages"
      },
      '7-page': {
        amount: 945,
        description: "7 Extra Pages"
      },
      '8-page': {
        amount: 1080,
        description: "8 Extra Pages"
      },
      '9-page': {
        amount: 1215,
        description: "9 Extra Pages"
      },
      '10-page': {
        amount: 1350,
        description: "10 Extra Pages"
      },
      '11-page': {
        amount: 1485,
        description: "11 Extra Pages"
      },
      '12-page': {
        amount: 1620,
        description: "12 Extra Pages"
      },
      '13-page': {
        amount: 1755,
        description: "13 Extra Pages"
      },
      '14-page': {
        amount: 1890,
        description: "14 Extra Pages"
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
