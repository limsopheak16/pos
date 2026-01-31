// Static data for deployment demonstration

// Generate sample data
const generateId = (prefix: string, index: number) => `${prefix}${index.toString().padStart(3, '0')}`;

const generateUsers = () => {
  const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'Robert', 'Lisa', 'James', 'Mary', 'William', 'Patricia', 'Richard', 'Jennifer', 'Charles', 'Linda', 'Joseph', 'Elizabeth', 'Thomas', 'Barbara'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson'];
  const roles = ['Administrator', 'Manager', 'Cashier', 'Customer Service', 'Sales Associate'];
  
  // Start with demo users to ensure they exist
  const demoUsers = [
    {
      id: generateId('USR', 1),
      username: "admin",
      email: "admin@ariya.com",
      role: "Administrator",
      roleId: "1",
      imageUrl: null,
      isActive: true,
    },
    {
      id: generateId('USR', 2),
      username: "manager",
      email: "manager@ariya.com",
      role: "Manager",
      roleId: "2",
      imageUrl: null,
      isActive: true,
    },
    {
      id: generateId('USR', 3),
      username: "cashier",
      email: "cashier@ariya.com",
      role: "Cashier",
      roleId: "3",
      imageUrl: null,
      isActive: true,
    }
  ];
  
  // Generate additional users to reach 100 total
  const additionalUsers = Array.from({ length: 97 }, (_, i) => {
    const index = i + 3; // Start from index 3 since we have 3 demo users
    const firstName = firstNames[index % firstNames.length];
    const lastName = lastNames[index % lastNames.length];
    const role = roles[index % roles.length];
    
    return {
      id: generateId('USR', index + 1),
      username: `${firstName.toLowerCase()}.${lastName.toLowerCase()}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@ariya.com`,
      role: role,
      roleId: String((index % 5) + 1),
      imageUrl: null,
      isActive: Math.random() > 0.1, // 90% active
    };
  });
  
  return [...demoUsers, ...additionalUsers];
};

const generateProducts = () => {
  const categories = ['Fruits & Vegetables', 'Dairy', 'Bakery', 'Beverages', 'Meat & Seafood', 'Pantry', 'Frozen Foods', 'Snacks', 'Personal Care', 'Household'];
  const productNames = [
    'Fresh Apples', 'Organic Bananas', 'Fresh Oranges', 'Grapes', 'Strawberries', 'Blueberries', 'Mangoes', 'Pineapples',
    'Whole Milk', 'Skim Milk', 'Greek Yogurt', 'Cheddar Cheese', 'Mozzarella', 'Butter', 'Cream Cheese', 'Eggs',
    'Whole Wheat Bread', 'White Bread', 'Bagels', 'Croissants', 'Muffins', 'Cookies', 'Cake', 'Pastries',
    'Orange Juice', 'Apple Juice', 'Coffee', 'Tea', 'Soda', 'Water', 'Energy Drinks', 'Smoothies',
    'Chicken Breast', 'Beef Steak', 'Pork Chops', 'Salmon', 'Tuna', 'Shrimp', 'Bacon', 'Sausages',
    'Rice', 'Pasta', 'Canned Tomatoes', 'Olive Oil', 'Flour', 'Sugar', 'Salt', 'Pepper',
    'Frozen Pizza', 'Ice Cream', 'Frozen Vegetables', 'Frozen Fruits', 'Frozen Meals', 'Fish Sticks', 'Chicken Nuggets', 'Frozen Desserts',
    'Potato Chips', 'Popcorn', 'Nuts', 'Crackers', 'Cookies', 'Candy', 'Chocolate', 'Granola Bars',
    'Shampoo', 'Soap', 'Toothpaste', 'Deodorant', 'Lotion', 'Sunscreen', 'Makeup', 'Razors',
    'Paper Towels', 'Toilet Paper', 'Dish Soap', 'Laundry Detergent', 'Trash Bags', 'Cleaning Spray', 'Sponges', 'Bleach'
  ];
  
  return Array.from({ length: 100 }, (_, i) => {
    const name = productNames[i % productNames.length];
    const category = categories[i % categories.length];
    const basePrice = Math.random() * 50 + 1; // $1-51
    const stock = Math.floor(Math.random() * 500) + 10; // 10-510 items
    
    return {
      id: generateId('PRD', i + 1),
      name: name,
      category: category,
      price: `$${basePrice.toFixed(2)}`,
      stock: stock,
      status: stock > 20 ? 'In Stock' : stock > 0 ? 'Low Stock' : 'Out of Stock'
    };
  });
};

const generateCustomers = () => {
  const firstNames = ['Alex', 'Sam', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Avery', 'Quinn', 'Sage', 'River', 'Skyler', 'Dakota', 'Phoenix', 'Reese'];
  const lastNames = ['Chen', 'Kim', 'Lee', 'Wang', 'Zhang', 'Liu', 'Yang', 'Huang', 'Zhao', 'Wu', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore'];
  
  return Array.from({ length: 100 }, (_, i) => {
    const firstName = firstNames[i % firstNames.length];
    const lastName = lastNames[i % lastNames.length];
    
    return {
      id: generateId('CUST', i + 1),
      firstName: firstName,
      lastName: lastName,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@customer.com`,
      phone: `+1${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      address: `${Math.floor(Math.random() * 9999) + 1} Main St, City ${i + 1}, ST ${Math.floor(Math.random() * 90000) + 10000}`,
      totalOrders: Math.floor(Math.random() * 50) + 1,
      totalSpent: Math.floor(Math.random() * 5000) + 100
    };
  });
};

const generateSuppliers = () => {
  const companies = [
    'Fresh Farms Inc', 'Dairy Delights Co', 'Bakery Brothers', 'Beverage World', 
    'Meat Masters', 'Seafood Suppliers', 'Pantry Plus', 'Frozen Foods Ltd', 
    'Snack Attack', 'Clean Home Corp', 'Organic Harvest Ltd', 'Global Foods Inc',
    'Premium Produce Co', 'Quality Meats Supply', 'Dairy Fresh Partners', 'Bread & Beyond'
  ];
  
  const contacts = [
    'John Smith', 'Jane Doe', 'Mike Johnson', 'Sarah Wilson', 'David Brown', 
    'Emily Davis', 'Robert Miller', 'Lisa Anderson', 'James Taylor', 'Mary Thomas',
    'Michael Chen', 'Jennifer Lee', 'William Garcia', 'Patricia Martinez', 'Richard Rodriguez'
  ];
  
  const categories = [
    'Produce', 'Dairy', 'Bakery', 'Beverages', 'Meat', 'Seafood', 
    'Pantry', 'Frozen', 'Snacks', 'Household', 'Organic', 'International'
  ];
  
  const paymentTerms = ['Net 30', 'Net 60', 'Net 90', 'COD', '2/10 Net 30'];
  const ratings = ['A+', 'A', 'A-', 'B+', 'B'];
  
  return Array.from({ length: 50 }, (_, i) => {
    const company = companies[i % companies.length];
    const contact = contacts[i % contacts.length];
    const category = categories[i % categories.length];
    
    return {
      id: generateId('SUP', i + 1),
      name: company,
      contactPerson: contact,
      email: `${contact.toLowerCase().replace(' ', '.')}@${company.toLowerCase().replace(/\s+/g, '')}.com`,
      phone: `+1${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      address: `${Math.floor(Math.random() * 9999) + 1} Supplier Ave, Supply City, SC ${Math.floor(Math.random() * 90000) + 10000}`,
      category: category,
      products: Math.floor(Math.random() * 50) + 10,
      annualRevenue: Math.floor(Math.random() * 5000000) + 100000,
      yearsInBusiness: Math.floor(Math.random() * 25) + 5,
      paymentTerms: paymentTerms[i % paymentTerms.length],
      rating: ratings[i % ratings.length],
      website: `www.${company.toLowerCase().replace(/\s+/g, '')}.com`,
      certifications: ['ISO 9001', 'FDA Approved', 'Organic Certified', 'HACCP Certified'].slice(0, Math.floor(Math.random() * 3) + 1),
      leadTime: Math.floor(Math.random() * 14) + 1, // days
      minimumOrder: Math.floor(Math.random() * 1000) + 100,
      reliability: Math.floor(Math.random() * 20) + 80, // percentage
      lastOrderDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      totalOrders: Math.floor(Math.random() * 500) + 50,
      totalSpent: Math.floor(Math.random() * 100000) + 5000
    };
  });
};

const generatePromotions = () => {
  const types = ['Percentage Discount', 'Buy One Get One', 'Fixed Amount Off', 'Free Shipping', 'Bundle Deal', 'Flash Sale', 'Seasonal Sale', 'Clearance'];
  const products = generateProducts();
  const statuses = ['Active', 'Scheduled', 'Expired', 'Paused'];
  const priorities = ['High', 'Medium', 'Low'];
  const channels = ['Online', 'In-Store', 'Mobile App', 'All Channels'];
  
  return Array.from({ length: 100 }, (_, i) => {
    const type = types[i % types.length];
    const product = products[i % products.length];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const priority = priorities[Math.floor(Math.random() * priorities.length)];
    const channel = channels[Math.floor(Math.random() * channels.length)];
    
    const startDate = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const endDate = new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    const discount = type === 'Percentage Discount' ? `${Math.floor(Math.random() * 50) + 10}%` : 
                    type === 'Fixed Amount Off' ? `$${(Math.random() * 20 + 5).toFixed(2)}` : 
                    type === 'Buy One Get One' ? 'BOGO' : 
                    type === 'Free Shipping' ? 'FREE SHIPPING' :
                    type === 'Bundle Deal' ? `Buy ${Math.floor(Math.random() * 3) + 2} Get 1 Free` :
                    type === 'Flash Sale' ? `${Math.floor(Math.random() * 70) + 20}% OFF` :
                    type === 'Seasonal Sale' ? `${Math.floor(Math.random() * 40) + 15}% SEASONAL` :
                    type === 'Clearance' ? `${Math.floor(Math.random() * 60) + 30}% CLEARANCE` : 'Special';
    
    const usageLimit = Math.floor(Math.random() * 1000) + 100;
    const usageCount = status === 'Expired' ? usageLimit : Math.floor(Math.random() * usageLimit);
    
    return {
      id: generateId('PROM', i + 1),
      name: `${type} - ${product.name}`,
      type: type,
      description: `Special ${type.toLowerCase()} on ${product.name}. Limited time offer!`,
      discount: discount,
      discountValue: type.includes('%') ? Math.floor(Math.random() * 50) + 10 : 
                   type.includes('$') ? parseFloat((Math.random() * 20 + 5).toFixed(2)) : 0,
      startDate: startDate,
      endDate: endDate,
      status: status,
      priority: priority,
      channel: channel,
      applicableProducts: [product.name],
      categories: [product.category],
      minimumPurchase: type === 'Free Shipping' ? Math.floor(Math.random() * 50) + 25 : 0,
      usageLimit: usageLimit,
      usageCount: usageCount,
      remainingUsage: usageLimit - usageCount,
      couponCode: `${type.replace(/\s+/g, '').toUpperCase().slice(0, 3)}${Date.now().toString().slice(-6)}-${i + 1}`,
      createdBy: ['Marketing Team', 'Sales Manager', 'Product Manager'][i % 3],
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      lastModified: new Date().toISOString(),
      isActive: status === 'Active',
      conditions: type === 'Buy One Get One' ? 'Buy one get one free on same item' :
                  type === 'Free Shipping' ? `Free shipping on orders over $${Math.floor(Math.random() * 50) + 25}` :
                  'Valid for all customers',
      performance: {
        views: Math.floor(Math.random() * 10000) + 1000,
        clicks: Math.floor(Math.random() * 2000) + 200,
        conversions: Math.floor(Math.random() * 500) + 50,
        revenue: Math.floor(Math.random() * 50000) + 5000
      }
    };
  });
};

const generateStockIns = () => {
  const products = generateProducts();
  const suppliers = generateSuppliers();
  
  const stockInTypes = ['Purchase Order', 'Return', 'Transfer', 'Adjustment', 'Initial Stock'];
  const statuses = ['Received', 'Pending', 'Partially Received', 'Backordered', 'Cancelled'];
  const priorities = ['High', 'Medium', 'Low'];
  const warehouses = ['Main Warehouse', 'Secondary Warehouse', 'Cold Storage', 'Dry Storage', 'Refrigerated'];
  
  return Array.from({ length: 100 }, (_, i) => {
    const product = products[i % products.length];
    const supplier = suppliers[i % suppliers.length];
    const quantity = Math.floor(Math.random() * 500) + 10;
    const unitPrice = parseFloat(product.price.replace('$', ''));
    const stockInType = stockInTypes[i % stockInTypes.length];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const priority = priorities[Math.floor(Math.random() * priorities.length)];
    const warehouse = warehouses[i % warehouses.length];
    const receivedQuantity = status === 'Received' ? quantity : 
                          status === 'Partially Received' ? Math.floor(quantity * 0.7) :
                          status === 'Backordered' ? 0 : quantity;
    
    return {
      id: generateId('STK', i + 1),
      productId: product.id,
      productName: product.name,
      supplierId: supplier.id,
      supplierName: supplier.name,
      quantity: quantity,
      receivedQuantity: receivedQuantity,
      unitPrice: unitPrice.toFixed(2),
      totalPrice: (quantity * unitPrice).toFixed(2),
      actualTotalPrice: (receivedQuantity * unitPrice).toFixed(2),
      date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      expectedDate: new Date(Date.now() + Math.random() * 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: status,
      stockInType: stockInType,
      priority: priority,
      warehouse: warehouse,
      category: product.category,
      sku: `SKU${product.id}`,
      batchNumber: `BATCH${Date.now().toString().slice(-6)}-${i + 1}`,
      expiryDate: new Date(Date.now() + Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      condition: 'Good',
      notes: stockInType === 'Purchase Order' ? `Regular stock replenishment for ${product.name}` : 
               stockInType === 'Return' ? `Customer return of ${product.name}` :
               stockInType === 'Transfer' ? `Transfer from ${warehouse} to Main Warehouse` :
               stockInType === 'Adjustment' ? `Inventory adjustment for ${product.name}` :
               `Initial stock setup for ${product.name}`,
      purchaseOrderNumber: stockInType === 'Purchase Order' ? `PO${Date.now().toString().slice(-6)}-${i + 1}` : null,
      invoiceNumber: stockInType === 'Purchase Order' ? `INV${Date.now().toString().slice(-6)}-${i + 1}` : null,
      receivedBy: ['John Smith', 'Jane Doe', 'Mike Johnson', 'Sarah Wilson', 'David Brown'][i % 5],
      verifiedBy: ['Admin', 'Manager', 'Supervisor'][i % 3],
      qualityCheck: Math.random() > 0.2,
      qualityCheckDate: Math.random() > 0.2 ? new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : null,
      storageLocation: `Aisle ${Math.floor(Math.random() * 20) + 1}-Shelf ${Math.floor(Math.random() * 10) + 1}`,
      lastUpdated: new Date().toISOString()
    };
  });
};

export const staticUsers = generateUsers();

export const staticRoles = [
  { id: "1", name: "Administrator" },
  { id: "2", name: "Manager" },
  { id: "3", name: "Cashier" },
  { id: "4", name: "Customer Service" },
  { id: "5", name: "Sales Associate" }
];

export const staticProducts = generateProducts();

export const staticCustomers = generateCustomers();

export const staticSuppliers = generateSuppliers();

export const staticPromotions = generatePromotions();

export const staticStockIns = generateStockIns();

export const staticAnalytics = {
  totalUsers: staticUsers.length,
  totalProducts: staticProducts.length,
  totalCustomers: staticCustomers.length,
  totalSuppliers: staticSuppliers.length,
  totalPromotions: staticPromotions.length,
  totalStockIns: staticStockIns.length,
  totalSales: 125780.50,
  salesGrowth: 15.3,
  userGrowth: 8.7,
  customerGrowth: 12.5,
  productGrowth: 6.2,
  lowStockProducts: staticProducts.filter(p => p.status === 'Low Stock').length,
  outOfStockProducts: staticProducts.filter(p => p.status === 'Out of Stock').length,
  activePromotions: staticPromotions.filter(p => p.status === 'Active').length
};

// Simple login credentials for demo
export const demoCredentials = {
  admin: { email: "admin@ariya.com", password: "admin123" },
  manager: { email: "manager@ariya.com", password: "manager123" },
  cashier: { email: "cashier@ariya.com", password: "cashier123" }
};
