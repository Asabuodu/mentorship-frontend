// src/types/index.ts
// src/types/index.ts
export type User = {
  _id: string;
  email: string;
  name?: string;
  role: 'admin' | 'mentor' | 'mentee';
};

export type MentorshipRequest = {
  _id: string;
  mentor: Mentor;
  mentee: User;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
};


export type Mentor = {
  _id: string;
  name: string;
  industry: string;
  bio: string;
  skills?: string[];
}

export type AvailabilityBlock = {
  _id: string;
  mentor: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
};

export type Request = {
  _id: string;
  mentee?: {
    name?: string;
    goals?: string;
  };
  createdAt: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  zoomLink?: string; 
  // add other fields as needed
};

 export type SentRequest = {
    mentor?: {
      _id: string;
    };
  };


  export type Session = {
    _id: string;
    mentor?: { name?: string };
    mentee?: { name?: string };
    dateTime: string;
     feedback?: {
    rating: number;
    comment: string;
  };
  }

  export type AdminRequest = {
  _id: string;
  mentor?: {
    name: string;
  };
  mentee?: {
    name: string;
  };
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  createdAt: string;
};
