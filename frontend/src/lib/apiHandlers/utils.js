'use server';

import { unstable_noStore as noStore } from 'next/cache';

export const getQuestions = async () => {
  noStore();
  try {
    const questionsResponse = await fetch(
      'http://localhost:3005/api/v1/questions',
    );
    if (!questionsResponse.ok)
      throw new Error('error while fetching questions');
    const { data: questions } = await questionsResponse.json();

    return questions;
  } catch (error) {
    console.error(error);
  }
};

export const getStations = async (govId) => {
  noStore();
  try {
    const stationsResponse = await fetch(
      `http://localhost:3005/api/v1/stations?govId=${govId}`,
    );

    if (!stationsResponse.ok) throw new Error('error while fetching stations');

    const { data: stations } = await stationsResponse.json();

    return stations;
  } catch (error) {
    console.error(error);
  }
};

export const getAreas = async () => {
  noStore();
  try {
    const areasResponse = await fetch('http://localhost:3005/api/v1/areas');

    if (!areasResponse.ok) throw new Error('error while fetching areas');

    const { data: areas } = await areasResponse.json();

    return areas;
  } catch (error) {
    console.error(error);
  }
};

export const getGovernorates = async (areaId) => {
  noStore();
  try {
    const govensResponse = await fetch(
      `http://localhost:3005/api/v1/governorates?areaId=${areaId}`,
    );

    if (!govensResponse.ok)
      throw new Error('error while fetching governorates');

    const { data: governs } = await govensResponse.json();

    return governs;
  } catch (error) {
    console.error(error);
  }
};

export const insertAnswers = async (data, stationName) => {
  noStore();

  try {
    const answersResponse = await fetch(
      'http://localhost:3005/api/v1/answers',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data, stationName }),
      },
    );

    if (!answersResponse.ok) throw new Error('error while inserting answers');

    return { message: 'تم إدخال البيانات بنجاح' };
  } catch (error) {
    console.error(error);
  }
};

export const getAnswers = async (stationName, date) => {
  noStore();
  try {
    const answersResponse = await fetch(
      `http://localhost:3005/api/v1/answers?stationName=${stationName}&date=${date}`,
    );
    if (!answersResponse) throw new Error('error while fetching answers');

    const data = await answersResponse.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};
