export const mockData=[

    {
        id:0,
        title:"Untitle 1",
        body:"Body 1"
    },
    {
        id:1,
        title:"Untitle 2",
        body:"Body 22"
    }

]
export const isMobileDevice = (window.innerWidth <500);

export const users=[
    {
        user_id:"",
        name:"",
        email:"",
        password:"",
        phone_number:"",
        role:"",
        created_at:""
    }
];

export const accommodations_bookings=[
    {
        booking_id:"123",
        user_id:"123",
        status:"pending",
        total_guests:"4",
        created_at:"2026-04-08",
        start_date:"2026-04-08",
        end_date:"2026-04-08",
        total_price:"100",
        accommodations:[{
            booking_detail_id:"",
            booking_id:"123",
            name:"#01",
            type:"A",
            capacity:"2",
            start_date:"2026-04-08",
            end_date:"2026-04-08",
            price_per_night:100,
        },
        {
            booking_detail_id:"",
            booking_id:"123",
            name:"#02",
            type:"B",
            capacity:"3",
            start_date:"2026-04-08",
            end_date:"2026-04-08",
            price_per_night:200,
        }
    ]
    },
    {
        booking_id:"1",
        user_id:"12",
        status:"pending",
        total_guests:"4",
        created_at:"2026-04-08",
        start_date:"2026-04-08",
        end_date:"2026-04-08",
        total_price:"100",
        accommodations:[{
            booking_detail_id:"",
            booking_id:"",
            accommodation_id:"",
            number_of_guests:"",
            start_date:"",
            end_date:"",
            price_per_night:"",
        }]
    }
]

export const accommodations_bookings_detail={
    
        booking_id:"",
        user_id:"",
        status:"",
        total_guests:"",
        created_at:"",
        start_date:"",
        end_date:"",
        total_price:"",
        accommodations:[{
            booking_detail_id:"",
            booking_id:"",
            accommodation_id:"",
            number_of_guests:"",
            start_date:"",
            end_date:"",
            price_per_night:"",
        }]
    }

    


export const booking_details=[
    {
        booking_detail_id:"",
        booking_id:"",
        accommodation_id:"",
        number_of_guests:"",
        start_date:"",
        end_date:"",
        price_per_night:"",
    }
]

export const accommodations=[
    {
        accommodation_id:"13",
        name:"ACV",
        type:"ACV",
        capacity:"2",
        price_per_night:"100",
        description:"Lorem is ",
        thumb:"./assets/test.jpg",
        images:["adsd", "dadsa"],
        amenties:["wifi", "Fridge", "Shower", "Toilet"],
    },
    {
        accommodation_id:"123",
        name:"ACV22",
        type:"ACV222",
        capacity:"2",
        price_per_night:"100",
        description:"Lorem is ",
        thumb:"./assets/test.jpg",
        images:["das", "dsad"],
        amenties:["wifi", "Fridge", "Shower", "Toilet"],
    }

]
export const accomodation_amenties=[
    {
        accommodation_id:"",
        amenty_id:"",
    }

]

export const amenties=[
    {
        amenty_id:"",
        amenty_name:""
    }

]
