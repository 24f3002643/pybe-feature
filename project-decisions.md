# Project Decisions
This markdown file will contain all the project decisions that were during the course of development of the feature.

## Decision 1 : Choosing and Designing the Feature

### Info
- Date : July 19, 2026
- Status : Superseded

### Context
- The interns are required to make one meaningful contribution to the project they choose in the Phase 2. It is the mandatory component to complete the internship.

### Decision
- I chose `recursion` as my feature.

### Reason
- Recursion seemed to me one of the topics that was slightly difficult to understand at the beginning.
- Also, a lot could be done in teaching recursion.

---

## Decision 2 : Redesigning the Feature

### Info 
- Date : Aug 4, 2026
- Status : Current

### Context 
1. I prepared the markdown file of feature proposal, and a pdf with detailed plan of what the feature will contain in all of its six stages.
2. I presented the feature proposal markdown in the meeting on July 21, 2026. 
3. Prakash sir said that if I could implement it what I have written in the markdown, then it would be better. Unless you try and implement, you will never understand how bad is what you are talking about.

### Decision 
1. I would redesign the feature to keep it small, meaningful and simple.

### Reason 
1. Previous Proposal was rejected because :
    - The feature focused on strict "make  feel the need" before introducing the concept. This would add more complexity to the feature.
    - Scope of the feature was too 'big'. Stage 1-4 focused on teach recursion as a general approach with no computer involved. Stage 5-6 focused on teaching recursion in programming terms, and demonstration of how recursion is good choice for advanced problems.
    - The way stage 1 and 2 was thought to be, it would required a good LLM in the backend, and a good interactive UI.
    - The earlier design avoided real code entirely, even in Stages 5–6, where recursion was finally connected to programming. Given that the feature is for PyBe - a Python-teaching project, it would be quite lame not to introduce recursion with code for the learners.
    - Many other things were based on baseless ground such as Stage 6 claim that loop cannot handle maze problem, and recursion is only way to do it, case  study in Stage 1 was quite unrealistic.
    - Reviewed the 14 feature submissions of other interns. The decisions made was inspired from the submission of other interns -  dropping strict felt-need (peers didn't do it either), ending in real running code (every peer did), and single-topic scope (no peer spanned basic-to-advanced).
2. Redesign
    - There will be bifurcation with stages.
    - There would be one character (Tenali Raman / Aryabhatta / etc), who will act as a narrator, or guide in the feature asking question from learners, directing them, etc.
    - There would be no strict "make feel the need", in order to keep feature simple. Focus would be present the idea of what was the need of recursion, but it would not be in strict terms. As long as the feature is meaningful, even having less of making the feel the need would be okay.
    - The idea of recursion would be presented with a simple real life example/ case study, like in hierarchy, the leader want to know some stats. The leader asks it subordinate to find the stats for their respective domain, etc. There would be just one case study.
    - There would be coding element in the feature. Like there would be code snippet with blanks, and there would be multiple options and learner would have to select/drag the options.
    - Focus would be to teach the idea/concept of recursion through case study, interaction (with the character). The focus would be teach these concepts :
        - Idea of recursion
        - Base Case and Recursive Case
        - How to convert problem into recursion way.

---