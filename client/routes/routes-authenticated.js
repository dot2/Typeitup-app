/*
* Routes: Authenticated
* Routes that are only visible to authenticated users.
*/

Router.route('todoLists', {
  path: '/lists',
  template: 'todoLists',
  subscriptions: function(){
    var subs = [
      Meteor.subscribe('userLists')
    ]
    return subs;
  },
  onBeforeAction: function(){
    Session.set('currentRoute', 'lists');
    this.next();
  }
});

Router.route('todoList', {
  path: '/lists/:_id',
  template: 'todoList',
  subscriptions: function(){
    var subs = [
      Meteor.subscribe('list', this.params._id)
    ]
    return subs;
  },
  data: function(){
    return TodoLists.findOne({"_id": this.params._id});
  },
  onBeforeAction: function(){
    Session.set('currentRoute', 'todoLists');
    this.next();
  }
});

Router.route('billing', {
  path: '/billing',
  template: 'billing',
  subscriptions: function(){
    var subs = [
      Meteor.subscribe('userInvoices')
    ]
    return subs;
  },
  onBeforeAction: function(){
    Session.set('currentRoute', 'billing');
    this.next();
  }
});

Router.route('billingPlan', {
  path: '/billing/plan',
  template: 'billingPlan',
  onBeforeAction: function(){
    Session.set('currentRoute', 'billing');
    this.next();
  }
});

Router.route('uploadSection', {
  path: '/upload',
  template: 'uploadSection',
  onBeforeAction: function(){
    Session.set('currentRoute', 'upload');
    this.next();
  }
});

Router.route('uploadForm', {
  path: '/upload-docs',
  template: 'uploadForm',
  onBeforeAction: function(){
    Session.set('currentRoute', 'upload-docs');
    this.next();
  }
});

Router.route('account', {
  path: '/account',
  template: 'account',
  onBeforeAction: function(){
    Session.set('currentRoute', 'account');
    this.next();
  }
});

Router.route('expressCheckout', {
  path: '/express-checkout',
  template: 'expressCheckout',
  onBeforeAction: function(){
    Session.set('currentRoute', 'express-checkout');
    this.next();
  }
});

Router.route('billingCard', {
  path: '/billing/card',
  template: 'billingCard',
  onBeforeAction: function(){
    Session.set('currentRoute', 'billing');
    Session.set('addingNewCreditCard', false);
    this.next();
  }
});

Router.route('billingInvoice', {
  path: '/billing/invoice/:_id',
  template: 'billingInvoice',
  subscriptions: function(){
    var subs = [
      Meteor.subscribe('viewInvoice', this.params._id)
    ]
  },
  data: function(){
    return Invoices.findOne({"_id": this.params._id});
  },
  onBeforeAction: function(){
    Session.set('currentRoute', 'billing');
    this.next();
  }
});

Router.route('billingResubscribe', {
  path: '/billing/resubscribe',
  template: 'billingResubscribe',
  onBeforeAction: function(){
    Session.set('addingNewCreditCard', false);
    Session.set('currentRoute', 'billing');
    this.next();
  }
});
