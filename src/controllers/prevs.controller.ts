import { exec } from 'child_process';
import { Request, Response } from 'express';

import UcPrevs from '../../data/proyecto-de-grado.json';
import satisfiesPrevs from '../lib/satisfiesPrevs';

const FILENAME = 'esc-ri.pdf';

export const checkPrevs = (req: Request, res: Response): void => {
  exec(
    `python src/scripts/pdf-reader.py uploads/${FILENAME} --wir`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return res.status(500).json({ error });
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return res.status(500).json({ error: stderr });
      }

      // console.log("Student data:", stdout) // Debug
      const studentData = JSON.parse(stdout);

      const satisfies = satisfiesPrevs(studentData, UcPrevs.prevs);
      console.log('Satisfies prevs:', satisfies);
      return res.status(200).json({ satisfies });
    }
  );
};
