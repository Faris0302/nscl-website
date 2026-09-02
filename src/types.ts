export interface JobOpening {
  id: string;
  title: string;
  department: 'Operations' | 'Engineering' | 'HSE' | 'Corporate';
  location: string;
  type: string;
  experience: string;
  description: string;
}

export interface TeamMember {
  name: string;
  role: string;
  desc: string;
  photoUrl: string;
}

export interface ProductSpec {
  name: string;
  tag: string;
  description: string;
  photoUrl: string;
  specs: { label: string; value: string }[];
  icon: string;
  anchor: string;
}

export interface TimelinePhase {
  phase: string;
  title: string;
  description: string;
}

export interface PartnerCompany {
  name: string;
  category: string;
  description: string;
  focus: string;
  logoUrl?: string;
  service?: string;
  country?: string;
  flagUrl?: string;
}
