import sampleData from '../data/sampleData.json';

export interface ActiveUser {
  timeBucket: string;
  value: number;
}

export interface Person {
  firstName: string;
  lastName: string;
}

export interface WorkForceUtilization {
  total: number;
  persons: Person[];
}

export interface SectionMetrics {
  waitTimeSeconds: number;
  workForceUtilization: WorkForceUtilization;
}

export interface SectionData {
  locationName: string;
  metrics: SectionMetrics;
}

export interface DashboardData {
  activeUsers: ActiveUser[];
  sectionData: SectionData[];
}


const simulateDelay = () => new Promise(resolve => setTimeout(resolve, 500));

export const fetchDashboardData = async (): Promise<DashboardData> => {
  await simulateDelay();
  return sampleData as DashboardData;
};

export const fetchActiveUsers = async (timeframe: 'daily' | 'weekly' | 'monthly'): Promise<ActiveUser[]> => {
  await simulateDelay();
  const data = sampleData as DashboardData;
  
  if (timeframe === 'weekly') {
    const weekly: ActiveUser[] = [];
    for (let i = 0; i < data.activeUsers.length; i += 7) {
      const weekData = data.activeUsers.slice(i, i + 7);
      const weekTotal = weekData.reduce((sum, day) => sum + day.value, 0);
      weekly.push({
        timeBucket: weekData[0].timeBucket,
        value: weekTotal
      });
    }
    return weekly;
  }
  
  if (timeframe === 'monthly') {
    const total = data.activeUsers.reduce((sum, day) => sum + day.value, 0);
    return [{
      timeBucket: data.activeUsers[0].timeBucket,
      value: total
    }];
  }
  
  return data.activeUsers;
};