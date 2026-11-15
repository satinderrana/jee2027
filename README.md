# JEE Main 2027 — toolkit

Everything needed to run the last 66 days before Session 1 (20–24 & 28 Jan 2027).
Start with **`GAME_PLAN.md`** — the tools exist to serve that document, not the other way round.

## Quick start (5 minutes)

1. **Read** `GAME_PLAN.md` §0. Confirm the application form and fee are done. That deadline is
   real and it is this week.
2. **Open** `tracker.html` in any browser (double-click it). Mark the chapters he is genuinely
   comfortable with as **OK**. Do not be generous — a chapter he "has done" but cannot solve a
   PYQ from is *Shaky*, not OK.
3. **Print** `out/study_plan.html` and stick week 1 on the wall.

Then every Sunday: sit one mock → log it → run the analyzer → act on the last screen of its output.

## Files

```
jee2027/
├── GAME_PLAN.md              the strategy — read this first
├── tracker.html              open in a browser: countdown, 54 chapters, mock log
├── out/
│   ├── study_plan.html       the dated day-by-day plan (print this)
│   └── study_plan.csv        same plan as data, if you prefer a spreadsheet
├── data/
│   ├── syllabus.csv          54 units w/ tier, difficulty, typical question count
│   ├── mocks.csv             mock history (empty — fill it)
│   └── mocks.sample.csv      worked example of the format
├── tools/
│   ├── planner.py            regenerate the plan
│   ├── mock_analyzer.py      turn a mock into a 7-day fix list
│   ├── build_tracker.py      rebuild tracker.html from syllabus.csv
│   ├── tracker.template.html source for tracker.html
│   └── test_tracker.js       headless test for the tracker (node)
└── src/syllabus2027.pdf      the official NTA 2027 syllabus, as downloaded
```

## Logging a mock

Fastest way — one command, appends a row and prints the analysis:

```bash
python3 tools/mock_analyzer.py \
  --date 2026-11-29 --name "Mock 2" --source Allen \
  --pa 21 --pc 12 --ca 24 --cc 16 --ma 18 --mc 9 \
  --loss "Rotational, Organic"
```

`Pa/Pc` = physics attempted / correct. Marks are derived: `4×correct − 1×wrong`.
Or just edit `data/mocks.csv` in a spreadsheet — the header row is `mocks.sample.csv`.

Uploads into `tracker.html` are separate (browser-local, and that is fine — it is the daily-use view).

## Sharing it with him

`tracker.html` is one self-contained file: no server, no CDN, no network. **Email it, put it in
Google Drive, or copy it onto his laptop — it works offline when double-clicked.**

Progress is stored in whichever browser opens it (localStorage), so:

- Same file on two devices = two separate progress records.
- Move progress with **Export backup** on device A → **Import backup** on device B.
- Clearing browser data / private windows erases progress. Export weekly.

There is no public URL by default — nothing in this folder is served from anywhere.

## Regenerating the plan

```bash
python3 tools/planner.py --hours 6 --weak Chemistry            # default
python3 tools/planner.py --hours 8 --weak Physics,Maths        # different week
python3 tools/planner.py --start 2026-11-22 --hours 5 --out out/plan_v2
```

`--weak` gets the first slot every day. `--hours` is study time **excluding** school/coaching, so be
honest — a plan built on 8 imaginary hours is worse than a plan built on 5 real ones.

Rebuild the tracker after editing `data/syllabus.csv`:

```bash
python3 tools/build_tracker.py
node tools/test_tracker.js        # optional: 18 assertions
```

## Assumptions and limits

- **Percentile figures are indicative.** NTA normalises per shift and never publishes a marks-to-
  percentile table. The curve inside the tools is a published session-analysis average; a hard shift
  can need 25–35 fewer marks for the same percentile.
- **Question counts per chapter are typical past-paper frequency, not a guarantee.** They are used
  only for prioritising, which is a forgiving use of an approximate number.
- **Syllabus = the official 2027 Paper 1 syllabus** (NTA, Oct 2026): 54 units. Nothing in the tracker
  is outside it.
- **The plan assumes** ~6 usable hours a day and a functioning school/coaching routine. If he is in
  coaching, the plan adds to it rather than replacing it — in that case run `--hours 3`.

## If he only does one thing

The error log in `GAME_PLAN.md` §5. Every wrong answer, logged the same day, tagged K/S/T, re-solved
cold the next morning. Everything else here is scaffolding around that habit.
