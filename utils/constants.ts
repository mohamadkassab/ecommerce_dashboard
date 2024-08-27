
export const DRAWERWIDTH = 240;


export const ROUTES = {
    ROOT: '/',
    SIGNIN: '/signin',
    DASHBOARD : '/dashboard',
    KPI: '/kpi',
    KPIADD: '/kpi/add'
  };

export const PROTECTED_ROUTES = [
  ROUTES.DASHBOARD,
  ROUTES.KPI,
  ROUTES.KPIADD,
]


export const SECTIONS = [
  {
    title: 'Dashboard',
    path: ROUTES.DASHBOARD,
  },
  {
    title: 'KPI',
    path: ROUTES.KPI,
  },

  {
    title: 'Sections',
 
  },
  {
    title: 'Categories',

  },

  {
    title: 'Reports',
  
  },
  {
    title: 'Orders',
 
  },
  {
    title: 'Marketing',
    subsections: ['hooks', 'templates'],
  },
  {
    title: 'Users',
    subsections: ['users', 'roles'],
  },
  {
    title: 'Iventory',
    subsections: ['inventory', 'upload & edit', 'bulk uploads', 'valuation'],
  },
  {
    title: 'Customers',
    subsections: ['customers', 'inquiries'],
  },
  {
    title: 'Application Configurations',
    subsections: ['tax rates', 'shipping options', 'zones'],
  },

  {
    title: 'Settings',
  },

  {
    title: 'Logs',

  },
];


export const DUMMYDATA = {
  VerticalBarChart:{
    xAxisData: ["group A", "group B", "group C"],
    seriesData: [{ data: [4, 2, 3] }, { data: [1, 2, 1] }]
  },

  HorizontalBarChart:{
    dataset:[
      { london: 59, paris: 57, newYork: 86, seoul: 21, month: "Jan" },
      { london: 50, paris: 52, newYork: 78, seoul: 28, month: "Feb" },
      { london: 47, paris: 53, newYork: 106, seoul: 41, month: "Mar" },
      { london: 54, paris: 56, newYork: 92, seoul: 73, month: "Apr" },
      { london: 57, paris: 69, newYork: 92, seoul: 99, month: "May" },
      { london: 60, paris: 63, newYork: 103, seoul: 144, month: "June" },
      { london: 59, paris: 60, newYork: 105, seoul: 319, month: "July" },
      { london: 65, paris: 60, newYork: 106, seoul: 249, month: "Aug" },
      { london: 51, paris: 51, newYork: 95, seoul: 131, month: "Sept" },
      { london: 60, paris: 65, newYork: 97, seoul: 55, month: "Oct" },
      { london: 67, paris: 64, newYork: 76, seoul: 48, month: "Nov" },
      { london: 61, paris: 70, newYork: 103, seoul: 25, month: "Dec" },
    ],
  },

  BiaxialLineChart:{
      years:[
        new Date(1990, 0, 1),
        new Date(1991, 0, 1),
        new Date(1992, 0, 1),
        new Date(1993, 0, 1),
        new Date(1994, 0, 1),
        new Date(1995, 0, 1),
        new Date(1996, 0, 1),
        new Date(1997, 0, 1),
        new Date(1998, 0, 1),
        new Date(1999, 0, 1),
        new Date(2000, 0, 1),
        new Date(2001, 0, 1),
        new Date(2002, 0, 1),
        new Date(2003, 0, 1),
        new Date(2004, 0, 1),
        new Date(2005, 0, 1),
        new Date(2006, 0, 1),
        new Date(2007, 0, 1),
        new Date(2008, 0, 1),
        new Date(2009, 0, 1),
        new Date(2010, 0, 1),
        new Date(2011, 0, 1),
        new Date(2012, 0, 1),
        new Date(2013, 0, 1),
        new Date(2014, 0, 1),
        new Date(2015, 0, 1),
        new Date(2016, 0, 1),
        new Date(2017, 0, 1),
        new Date(2018, 0, 1),
      ],

      FranceGDPperCapita:[
        28129, 28294.264, 28619.805, 28336.16, 28907.977, 29418.863, 29736.645, 30341.807,
        31323.078, 32284.611, 33409.68, 33920.098, 34152.773, 34292.03, 35093.824,
        35495.465, 36166.16, 36845.684, 36761.793, 35534.926, 36086.727, 36691, 36571,
        36632, 36527, 36827, 37124, 37895, 38515.918,
      ],

      UKGDPperCapita:[
        26189, 25792.014, 25790.186, 26349.342, 27277.543, 27861.215, 28472.248, 29259.764,
        30077.385, 30932.537, 31946.037, 32660.441, 33271.3, 34232.426, 34865.78,
        35623.625, 36214.07, 36816.676, 36264.79, 34402.36, 34754.473, 34971, 35185, 35618,
        36436, 36941, 37334, 37782.83, 38058.086,
      ],

      GermanyGDPperCapita:[
        25391, 26769.96, 27385.055, 27250.701, 28140.057, 28868.945, 29349.982, 30186.945,
        31129.584, 32087.604, 33367.285, 34260.29, 34590.93, 34716.44, 35528.715,
        36205.574, 38014.137, 39752.207, 40715.434, 38962.938, 41109.582, 43189, 43320,
        43413, 43922, 44293, 44689, 45619.785, 46177.617,
      ],
      
      

  },

  PieActiveArc:{
    data:  [
      { id: 0, value: 10, label: 'series A' },
      { id: 1, value: 15, label: 'series B' },
      { id: 2, value: 20, label: 'series C' },
    ]
  },

  TopN:{
    items:
      [
        { name: 'Item 1', value: 100 },
        { name: 'Item 2', value: 80 },
        { name: 'Item 3', value: 70 },
        { name: 'Item 4', value: 100 },
        { name: 'Item 5', value: 80 },
        { name: 'Item 6', value: 70 },
        { name: 'Item N', value: 50 },
 
      ]
    
  },

  BasicColorLegend:{
    dataset:[
      { year: new Date(1850, 0, 1), value: -0.4177114 },
      { year: new Date(1851, 0, 1), value: -0.2333498 },
      { year: new Date(1852, 0, 1), value: -0.22939907 },
      { year: new Date(1853, 0, 1), value: -0.27035445 },
      { year: new Date(1854, 0, 1), value: -0.29152083 },
      { year: new Date(1855, 0, 1), value: -0.29691675 },
      { year: new Date(1856, 0, 1), value: -0.32035372 },
      { year: new Date(1857, 0, 1), value: -0.46723005 },
      { year: new Date(1858, 0, 1), value: -0.3887657 },
      { year: new Date(1859, 0, 1), value: -0.28126517 },
      { year: new Date(1860, 0, 1), value: -0.39016518 },
      { year: new Date(1861, 0, 1), value: -0.42911294 },
      { year: new Date(1862, 0, 1), value: -0.5363694 },
      { year: new Date(1863, 0, 1), value: -0.34424406 },
      { year: new Date(1864, 0, 1), value: -0.46546507 },
      { year: new Date(1865, 0, 1), value: -0.33248132 },
      { year: new Date(1866, 0, 1), value: -0.3412875 },
      { year: new Date(1867, 0, 1), value: -0.35699412 },
      { year: new Date(1868, 0, 1), value: -0.35182714 },
      { year: new Date(1869, 0, 1), value: -0.31659195 },
      { year: new Date(1870, 0, 1), value: -0.32792753 },
      { year: new Date(1871, 0, 1), value: -0.36856276 },
      { year: new Date(1872, 0, 1), value: -0.32811058 },
      { year: new Date(1873, 0, 1), value: -0.3412969 },
      { year: new Date(1874, 0, 1), value: -0.3732512 },
      { year: new Date(1875, 0, 1), value: -0.37562594 },
      { year: new Date(1876, 0, 1), value: -0.4241099 },
      { year: new Date(1877, 0, 1), value: -0.10110884 },
      { year: new Date(1878, 0, 1), value: -0.011315192 },
      { year: new Date(1879, 0, 1), value: -0.30363432 },
      { year: new Date(1880, 0, 1), value: -0.31583205 },
      { year: new Date(1881, 0, 1), value: -0.23224552 },
      { year: new Date(1882, 0, 1), value: -0.29553008 },
      { year: new Date(1883, 0, 1), value: -0.3464744 },
      { year: new Date(1884, 0, 1), value: -0.49232006 },
      { year: new Date(1885, 0, 1), value: -0.47112358 },
      { year: new Date(1886, 0, 1), value: -0.42090362 },
      { year: new Date(1887, 0, 1), value: -0.49878576 },
      { year: new Date(1888, 0, 1), value: -0.37937889 },
      { year: new Date(1889, 0, 1), value: -0.24989556 },
      { year: new Date(1890, 0, 1), value: -0.50685817 },
      { year: new Date(1891, 0, 1), value: -0.40131494 },
      { year: new Date(1892, 0, 1), value: -0.5075585 },
      { year: new Date(1893, 0, 1), value: -0.49461922 },
      { year: new Date(1894, 0, 1), value: -0.48376393 },
      { year: new Date(1895, 0, 1), value: -0.4487516 },
      { year: new Date(1896, 0, 1), value: -0.28400728 },
      { year: new Date(1897, 0, 1), value: -0.25980017 },
      { year: new Date(1898, 0, 1), value: -0.48579213 },
      { year: new Date(1899, 0, 1), value: -0.35543364 },
      { year: new Date(1900, 0, 1), value: -0.2344939 },
      { year: new Date(1901, 0, 1), value: -0.29341024 },
      { year: new Date(1902, 0, 1), value: -0.43895653 },
      { year: new Date(1903, 0, 1), value: -0.5332871 },
      { year: new Date(1904, 0, 1), value: -0.59751105 },
      { year: new Date(1905, 0, 1), value: -0.40779322 },
      { year: new Date(1906, 0, 1), value: -0.31910878 },
      { year: new Date(1907, 0, 1), value: -0.5040763 },
      { year: new Date(1908, 0, 1), value: -0.5138197 },
      { year: new Date(1909, 0, 1), value: -0.53568715 },
      { year: new Date(1910, 0, 1), value: -0.5309095 },
      { year: new Date(1911, 0, 1), value: -0.539079 },
      { year: new Date(1912, 0, 1), value: -0.47553864 },
      { year: new Date(1913, 0, 1), value: -0.4670111 },
      { year: new Date(1914, 0, 1), value: -0.26243657 },
      { year: new Date(1915, 0, 1), value: -0.19167219 },
      { year: new Date(1916, 0, 1), value: -0.42002314 },
      { year: new Date(1917, 0, 1), value: -0.5428197 },
      { year: new Date(1918, 0, 1), value: -0.4243641 },
      { year: new Date(1919, 0, 1), value: -0.32528907 },
      { year: new Date(1920, 0, 1), value: -0.29835507 },
      { year: new Date(1921, 0, 1), value: -0.24044435 },
      { year: new Date(1922, 0, 1), value: -0.3390137 },
      { year: new Date(1923, 0, 1), value: -0.31768188 },
      { year: new Date(1924, 0, 1), value: -0.3118017 },
      { year: new Date(1925, 0, 1), value: -0.28214198 },
      { year: new Date(1926, 0, 1), value: -0.122555 },
      { year: new Date(1927, 0, 1), value: -0.2291136 },
      { year: new Date(1928, 0, 1), value: -0.20646581 },
      { year: new Date(1929, 0, 1), value: -0.39244303 },
      { year: new Date(1930, 0, 1), value: -0.17680542 },
      { year: new Date(1931, 0, 1), value: -0.103397675 },
      { year: new Date(1932, 0, 1), value: -0.14546171 },
      { year: new Date(1933, 0, 1), value: -0.32234442 },
      { year: new Date(1934, 0, 1), value: -0.17433685 },
      { year: new Date(1935, 0, 1), value: -0.20605923 },
      { year: new Date(1936, 0, 1), value: -0.16952094 },
      { year: new Date(1937, 0, 1), value: -0.019198947 },
      { year: new Date(1938, 0, 1), value: -0.012200737 },
      { year: new Date(1939, 0, 1), value: -0.040797204 },
      { year: new Date(1940, 0, 1), value: 0.07593582 },
      { year: new Date(1941, 0, 1), value: 0.0381293 },
      { year: new Date(1942, 0, 1), value: 0.0014060677 },
      { year: new Date(1943, 0, 1), value: 0.0064215823 },
      { year: new Date(1944, 0, 1), value: 0.14410514 },
      { year: new Date(1945, 0, 1), value: 0.043088354 },
      { year: new Date(1946, 0, 1), value: -0.11881461 },
      { year: new Date(1947, 0, 1), value: -0.09120561 },
      { year: new Date(1948, 0, 1), value: -0.12466127 },
      { year: new Date(1949, 0, 1), value: -0.14380223 },
      { year: new Date(1950, 0, 1), value: -0.2266218 },
      { year: new Date(1951, 0, 1), value: -0.06115396 },
      { year: new Date(1952, 0, 1), value: 0.015354548 },
      { year: new Date(1953, 0, 1), value: 0.07763075 },
      { year: new Date(1954, 0, 1), value: -0.11675023 },
      { year: new Date(1955, 0, 1), value: -0.19730994 },
      { year: new Date(1956, 0, 1), value: -0.26316562 },
      { year: new Date(1957, 0, 1), value: -0.035334915 },
      { year: new Date(1958, 0, 1), value: -0.017632563 },
      { year: new Date(1959, 0, 1), value: -0.048004813 },
      { year: new Date(1960, 0, 1), value: -0.11545958 },
      { year: new Date(1961, 0, 1), value: -0.019999769 },
      { year: new Date(1962, 0, 1), value: -0.06404272 },
      { year: new Date(1963, 0, 1), value: -0.036810614 },
      { year: new Date(1964, 0, 1), value: -0.30586153 },
      { year: new Date(1965, 0, 1), value: -0.20442048 },
      { year: new Date(1966, 0, 1), value: -0.1488976 },
      { year: new Date(1967, 0, 1), value: -0.117539294 },
      { year: new Date(1968, 0, 1), value: -0.16864756 },
      { year: new Date(1969, 0, 1), value: -0.03138624 },
      { year: new Date(1970, 0, 1), value: -0.08506408 },
      { year: new Date(1971, 0, 1), value: -0.20588905 },
      { year: new Date(1972, 0, 1), value: -0.09379131 },
      { year: new Date(1973, 0, 1), value: 0.04995016 },
      { year: new Date(1974, 0, 1), value: -0.17252657 },
      { year: new Date(1975, 0, 1), value: -0.110754214 },
      { year: new Date(1976, 0, 1), value: -0.2158369 },
      { year: new Date(1977, 0, 1), value: 0.1030885 },
      { year: new Date(1978, 0, 1), value: 0.0052559716 },
      { year: new Date(1979, 0, 1), value: 0.09085814 },
      { year: new Date(1980, 0, 1), value: 0.19607204 },
      { year: new Date(1981, 0, 1), value: 0.25001204 },
      { year: new Date(1982, 0, 1), value: 0.034268282 },
      { year: new Date(1983, 0, 1), value: 0.22380984 },
      { year: new Date(1984, 0, 1), value: 0.04799352 },
      { year: new Date(1985, 0, 1), value: 0.049729742 },
      { year: new Date(1986, 0, 1), value: 0.09568698 },
      { year: new Date(1987, 0, 1), value: 0.2430264 },
      { year: new Date(1988, 0, 1), value: 0.2821517 },
      { year: new Date(1989, 0, 1), value: 0.1792503 },
      { year: new Date(1990, 0, 1), value: 0.36058238 },
      { year: new Date(1991, 0, 1), value: 0.33889654 },
      { year: new Date(1992, 0, 1), value: 0.12489683 },
      { year: new Date(1993, 0, 1), value: 0.16570719 },
      { year: new Date(1994, 0, 1), value: 0.23354979 },
      { year: new Date(1995, 0, 1), value: 0.37686613 },
      { year: new Date(1996, 0, 1), value: 0.27668938 },
      { year: new Date(1997, 0, 1), value: 0.4223085 },
      { year: new Date(1998, 0, 1), value: 0.5773417 },
      { year: new Date(1999, 0, 1), value: 0.32448497 },
      { year: new Date(2000, 0, 1), value: 0.33108476 },
      { year: new Date(2001, 0, 1), value: 0.48928034 },
      { year: new Date(2002, 0, 1), value: 0.5434665 },
      { year: new Date(2003, 0, 1), value: 0.54417014 },
      { year: new Date(2004, 0, 1), value: 0.46737072 },
      { year: new Date(2005, 0, 1), value: 0.6068625 },
      { year: new Date(2006, 0, 1), value: 0.5725527 },
      { year: new Date(2007, 0, 1), value: 0.5917013 },
      { year: new Date(2008, 0, 1), value: 0.46564984 },
      { year: new Date(2009, 0, 1), value: 0.5967816 },
      { year: new Date(2010, 0, 1), value: 0.6803714 },
      { year: new Date(2011, 0, 1), value: 0.53769773 },
      { year: new Date(2012, 0, 1), value: 0.57760704 },
      { year: new Date(2013, 0, 1), value: 0.6235753 },
      { year: new Date(2014, 0, 1), value: 0.67287165 },
      { year: new Date(2015, 0, 1), value: 0.8251144 },
      { year: new Date(2016, 0, 1), value: 0.9329271 },
      { year: new Date(2017, 0, 1), value: 0.84517425 },
      { year: new Date(2018, 0, 1), value: 0.76265407 },
      { year: new Date(2019, 0, 1), value: 0.8910726 },
      { year: new Date(2020, 0, 1), value: 0.9229205 },
      { year: new Date(2021, 0, 1), value: 0.76190555 },
      { year: new Date(2022, 0, 1), value: 0.8013053 },
      { year: new Date(2023, 0, 1), value: 1.1003127 },
      { year: new Date(2024, 0, 1), value: 1.2314565 },
    ]
  }

}

  
  