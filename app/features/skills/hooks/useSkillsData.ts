'use client';

import { useEffect, useState } from 'react';
import type { SkillCategory } from '../types';

type SkillsDataState = {
  loading: boolean;
  categories: SkillCategory[];
};

export const useSkillsData = () => {
  const [state, setState] = useState<SkillsDataState>({
    loading: true,
    categories: [],
  });

  useEffect(() => {
    let cancelled = false;

    const loadSkills = async () => {
      try {
        const response = await fetch('/data/skills.json');
        const data = (await response.json()) as SkillCategory[];

        if (cancelled) {
          return;
        }

        setState({
          loading: false,
          categories: data,
        });
      } catch (error) {
        console.error('Error loading skills data:', error);

        if (cancelled) {
          return;
        }

        setState({
          loading: false,
          categories: [],
        });
      }
    };

    loadSkills();

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
};
