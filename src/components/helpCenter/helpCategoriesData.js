export const helpCategoriesData = {
  'orders-payments': {
    title: 'Orders & Payment',
    breadcrumbs: [
      { label: 'Market CloseBy', link: '/' },
      { label: 'Help Center', link: '/help' },
      { label: 'Orders & Payments', active: true }
    ],
    description: {
      title: 'How to place orders and pay',
      subtitle: 'Get help with placing orders, making payments, and managing transactions.'
    },
    sections: [
      {
        id: 1,
        title: 'Placing an Order',
        bgColor: 'bg-[#2B2D7A]',
        steps: [
          'Browse products and add your desired items to the cart.',
          'Proceed to checkout and enter your shipping details.',
          'Choose a payment method and confirm your order.',
          'Receive an order confirmation via email or SMS.'
        ]
      },
      {
        id: 2,
        title: 'Payment Methods',
        bgColor: 'bg-[#2B2D7A]',
        steps: [
          'Select from available payment options: debit/credit cards, bank transfers, or digital wallets.',
          'Ensure sufficient funds and complete payment at checkout.',
          'Receive a confirmation once your payment is processed.'
        ]
      },
      {
        id: 3,
        title: 'Order Status & Tracking',
        bgColor: 'bg-[#2B2D7A]',
        steps: [
          'Log in to your account and go to "My Orders."',
          'Click on your order to view its status.',
          'Track your package using the provided tracking number.'
        ]
      },
      {
        id: 4,
        title: 'Modifying or Cancelling an Order',
        bgColor: 'bg-[#2B2D7A]',
        steps: [
          'Go to "My Orders" and select the order you want to modify or cancel.',
          'If the order has not been processed, click "Edit" or "Cancel."',
          'If modifications are not possible, contact customer support for assistance.'
        ]
      },
      {
        id: 5,
        title: 'Payment Issues',
        bgColor: 'bg-[#2B2D7A]',
        steps: [
          'Check if your card or account has sufficient balance.',
          'Ensure your payment details are correct.',
          'Try a different payment method if the issue persists.',
          'Contact support if your payment is declined or if you need a refund.'
        ]
      }
    ]
  },
  
  'shipping-delivery': {
    title: 'Shipping & Delivery',
    breadcrumbs: [
      { label: 'Market CloseBy', link: '/' },
      { label: 'Help Center', link: '/help' },
      { label: 'Shipping & Delivery', active: true }
    ],
    description: {
      title: 'Shipping & Delivery',
      subtitle: 'Find information about shipping options, delivery times, and tracking your orders.'
    },
    sections: [
      {
        id: 1,
        title: 'Shipping Options',
        bgColor: 'bg-[#2B2D7A]',
        steps: [
          'Choose from standard, express, or same-day delivery (where available).',
          'Shipping costs vary based on location and delivery speed.',
          'Express delivery options available for faster shipping.',
          'Free shipping is available for eligible products.'
        ]
      },
      {
        id: 2,
        title: 'Estimated Delivery Time',
        bgColor: 'bg-[#2B2D7A]',
        steps: [
          'Delivery times depend on your location and the selected shipping method.',
          'You will receive an estimated delivery date at checkout.',
          'Check your order status for real-time delivery updates.'
        ]
      },
      {
        id: 3,
        title: 'Tracking Your Order',
        bgColor: 'bg-[#2B2D7A]',
        steps: [
          'Log in to your account and go to "My Orders."',
          'Click on your order to view tracking details.',
          'Use the tracking number to follow your package\'s journey.'
        ]
      },
      {
        id: 4,
        title: 'Missed Delivery or Delayed Orders',
        bgColor: 'bg-[#2B2D7A]',
        steps: [
          'If you missed a delivery, the courier will attempt redelivery or leave a pickup notice.',
          'For delays, check your tracking details or contact support for assistance.'
        ]
      }
    ]
  },
  
  'returns-refunds': {
    title: 'Returns & Refunds',
    breadcrumbs: [
      { label: 'Market CloseBy', link: '/' },
      { label: 'Help Center', link: '/help' },
      { label: 'Returns & Refunds', active: true }
    ],
    description: {
      title: 'Returns & Refunds',
      subtitle: 'We strive to ensure a smooth return process. Follow the steps below if you need to return an item.'
    },
    sections: [
      {
        id: 1,
        title: 'Return Policy',
        bgColor: 'bg-[#2B2D7A]',
        steps: [
          'You can return items within [X] days of receiving your order.',
          'Items must be unused, in original packaging, and in resalable condition.',
          'Some products, like perishable items, are not eligible for returns.'
        ]
      },
      {
        id: 2,
        title: 'How to Return an Item',
        bgColor: 'bg-[#2B2D7A]',
        steps: [
          'Log in to your account and go to "My Orders."',
          'Select the item(s) you wish to return and click "Return Item."',
          'Follow the prompts to submit your return request.',
          'Pack the item securely and ship it back to us using the provided return label.'
        ]
      },
      {
        id: 3,
        title: 'Refund Process',
        bgColor: 'bg-[#2B2D7A]',
        steps: [
          'Once we receive and inspect your return, we\'ll process your refund.',
          'Refunds are issued to your original payment method within [X] business days.',
          'If the refund method is unavailable, we\'ll provide store credit.'
        ]
      },
      {
        id: 4,
        title: 'Exchanges',
        bgColor: 'bg-[#2B2D7A]',
        steps: [
          'You can request an exchange for a different size or color on eligible items.',
          'If an exchange is not possible, a refund will be issued.'
        ]
      },
      {
        id: 5,
        title: 'Items Not Eligible for Returns',
        bgColor: 'bg-[#2B2D7A]',
        steps: [
          'Perishable goods (e.g., food, beverages).',
          'Personal care products (e.g., skincare, cosmetics, fragrances).',
          'Undergarments & swimwear (for hygiene reasons).',
          'Customized or personalized items.'
        ]
      }
    ]
  },
  
  'account-settings': {
    title: 'Account Settings',
    breadcrumbs: [
      { label: 'Market CloseBy', link: '/' },
      { label: 'Help Center', link: '/help' },
      { label: 'Account Settings', active: true }
    ],
    description: {
      title: 'Account Settings',
      subtitle: 'Here\'s how you can manage and update your account settings.'
    },
    sections: [
      {
        id: 1,
        title: 'How to Update Your Personal Information',
        bgColor: 'bg-[#2B2D7A]',
        steps: [
          'Log in to your account and navigate to "Account Settings."',
          'Click on "Edit Profile" to update your name, email, phone number, and address.',
          'Save changes once you\'re done.'
        ]
      },
      {
        id: 2,
        title: 'Change Your Password',
        bgColor: 'bg-[#2B2D7A]',
        steps: [
          'Go to "Account Settings" and click on "Security Settings."',
          'Click on "Change Password" and enter your old and new passwords.',
          'Save your new password.'
        ]
      },
      {
        id: 3,
        title: 'Payment Methods',
        bgColor: 'bg-[#2B2D7A]',
        steps: [
          'Under "Account Settings," click on "Payment Methods."',
          'You can add, update, or remove your debit/credit card information here.',
          'Save your changes after updating.'
        ]
      },
      {
        id: 4,
        title: 'Notification Preferences',
        bgColor: 'bg-[#2B2D7A]',
        steps: [
          'Go to "Account Settings" and click on "Notifications."',
          'Choose which updates and promotions you\'d like to receive via email or SMS.',
          'Save your preferences.'
        ]
      },
      {
        id: 5,
        title: 'Privacy & Data Settings',
        bgColor: 'bg-[#2B2D7A]',
        steps: [
          'Navigate to "Privacy Settings" in your account.',
          'Manage how your data is used or shared.',
          'Make sure to save any changes you make.'
        ]
      }
    ]
  },
  
  'buyers-sellers': {
    title: 'Buyer & Seller Support',
    breadcrumbs: [
      { label: 'Market CloseBy', link: '/' },
      { label: 'Help Center', link: '/help' },
      { label: 'Buyer & Seller Support', active: true }
    ],
    description: {
      title: 'Buyer & Seller Support',
      subtitle: 'Here\'s how you can get assistance as a buyer or seller.'
    },
    sections: [
      {
        id: 1,
        title: 'How to Resolve Order Issues',
        bgColor: 'bg-[#2B2D7A]',
        steps: [
          'Log in to your account and go to the "Orders" section.',
          'Select the order you need help with and choose the relevant action, like tracking or reporting an issue.',
          'Follow the instructions to resolve the issue.'
        ]
      },
      {
        id: 2,
        title: 'How to Handle Payment Issues',
        bgColor: 'bg-[#2B2D7A]',
        steps: [
          'In your account, navigate to the "Payments" section.',
          'Review the payment status or troubleshoot any issues listed.',
          'If unresolved, contact support directly for assistance.'
        ]
      },
      {
        id: 3,
        title: 'How to Process Returns & Refunds',
        bgColor: 'bg-[#2B2D7A]',
        steps: [
          'Log into your account and go to the "Returns & Refunds" page.',
          'Select the product you want to return and follow the step-by-step guide.',
          'If you\'re eligible, you\'ll be refunded after the return is processed.'
        ]
      },
      {
        id: 4,
        title: 'How to Manage Listings',
        bgColor: 'bg-[#2B2D7A]',
        steps: [
          'Log in to your seller account.',
          'Go to the "Product Listings" section.',
          'Edit or update your listings as needed.'
        ]
      },
      {
        id: 5,
        title: 'How to Fulfill Orders',
        bgColor: 'bg-[#2B2D7A]',
        steps: [
          'Log into your seller dashboard.',
          'Check new orders and select the ones to fulfill.',
          'Follow the prompts to confirm shipping and delivery details.'
        ]
      }
    ]
  },
  
  'customer-support': {
    title: 'Customer Support',
    breadcrumbs: [
      { label: 'Market CloseBy', link: '/' },
      { label: 'Help Center', link: '/help' },
      { label: 'Customer Support', active: true }
    ],
    description: {
      title: 'Customer Support',
      subtitle: 'Here\'s how you can get assistance with any issues or inquiries.'
    },
    sections: [
      {
        id: 1,
        title: 'How to Contact Customer Support',
        bgColor: 'bg-[#2B2D7A]',
        steps: [
          'Log in to your account and go to the "Orders" section.',
          'Select the order you need help with and choose the relevant action, like tracking or reporting an issue.',
          'Follow the instructions to resolve the issue.'
        ]
      },
      {
        id: 2,
        title: 'How to Track Your Inquiry',
        bgColor: 'bg-[#2B2D7A]',
        steps: [
          'In your account, navigate to the "Payments" section.',
          'Review the payment status or troubleshoot any issues listed.',
          'If unresolved, contact support directly for assistance.'
        ]
      },
      {
        id: 3,
        title: 'How to Get Assistance for Account Issues',
        bgColor: 'bg-[#2B2D7A]',
        steps: [
          'Log into your account and go to the "Returns & Refunds" page.',
          'Select the product you want to return and follow the step-by-step guide.',
          'If you\'re eligible, you\'ll be refunded after the return is processed.'
        ]
      },
      {
        id: 4,
        title: 'How to Resolve Shipping Issues',
        bgColor: 'bg-[#2B2D7A]',
        steps: [
          'Log in to your seller account.',
          'Go to the "Product Listings" section.',
          'Edit or update your listings as needed.'
        ]
      }
    ]
  }
};