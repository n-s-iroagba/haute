


export const formatStartDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB');
};

export const formatEndDate = (dateString: string, numberOfDays: number): string => {
  const startDate = new Date(dateString);
  const endDate = new Date(startDate.getTime() + numberOfDays * 24 * 60 * 60 * 1000);
  return endDate.toLocaleDateString('en-GB');
};

export const getGreeting = (): string => {
  const currentTime = new Date().getHours();

  if (currentTime >= 0 && currentTime < 12) {
    return 'Good morning';
  } else if (currentTime >= 12 && currentTime < 18) {
    return 'Good afternoon';
  } else {
    return 'Good evening';
  }
};