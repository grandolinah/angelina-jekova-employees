import { EmployeeProjectMapType, WorkingPairType } from '@/app/types/common';

const calculateDaysWorked = (dateFrom: Date, dateTo: Date): number => {
  const millisecondsInDay = 1000 * 60 * 60 * 24;
  const daysWorked = Math.floor((Number(dateTo) - Number(dateFrom)) / millisecondsInDay);

  return daysWorked;
};

export const findLongestWorkingPair = (data: string[][]) => {
  const employeeProjects: EmployeeProjectMapType = {};

  data.forEach((row: string[]) => {
    const today = new Date();
    const [empId, projectId, dateFrom, dateTo] = row;
    const currentDateTo = dateTo === 'NULL' ? today : new Date(dateTo);
    const currentDateFrom = new Date(dateFrom);

    if (!employeeProjects[empId]) {
      employeeProjects[empId] = {};
    }

    if (!employeeProjects[empId][projectId]) {
      employeeProjects[empId][projectId] = { dateFrom: currentDateFrom, dateTo: currentDateTo };
    }
  });

  let longestWorkingPair: string[] | null = null;
  let maxDaysWorked: number = 0;
  const pairs: WorkingPairType[] = [];

  Object.keys(employeeProjects).forEach((empIdOne) => {
    Object.keys(employeeProjects).forEach((empIdTwo) => {
      if (empIdOne !== empIdTwo) {
        const commonProjects = Object.keys(employeeProjects[empIdOne]).filter(projectId =>
          employeeProjects[empIdTwo][projectId]
        );

        commonProjects.forEach((projectId) => {
          const daysWorked = calculateDaysWorked(
            employeeProjects[empIdOne][projectId].dateFrom,
            employeeProjects[empIdOne][projectId].dateTo
          ) + calculateDaysWorked(
            employeeProjects[empIdTwo][projectId].dateFrom,
            employeeProjects[empIdTwo][projectId].dateTo
          );

          const isAlreadyPaired = pairs.find(item => item.empIdTwo === empIdOne && item.empIdOne === empIdTwo && item.projectId === projectId);

          if (!isAlreadyPaired) {
            pairs.push({
              empIdOne,
              empIdTwo,
              projectId,
              daysWorked
            });
          }

          if (daysWorked > maxDaysWorked) {
            maxDaysWorked = daysWorked;
            longestWorkingPair = [empIdOne, empIdTwo, projectId, `${daysWorked}`];
          }
        });
      }
    });
  });

  return { longestWorkingPair, pairs };
};
