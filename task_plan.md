# Task Plan: 以面试题与语法手册为基准扩展自测试卷

## Goal
审查 `Python/docs/python/python 面试题.md`、语法手册与自测试卷之间的覆盖差异，持续为 `Python/docs/python/Python核心语法自测试卷.md` 补充遗漏题目，并尽量保持旧题号稳定不变。

## Current Phase
Phase 5

## Phases

### Phase 1: Requirements & Discovery
- [x] Understand user intent
- [x] Identify constraints and requirements
- [x] Document findings in findings.md
- **Status:** complete

### Phase 2: Gap Analysis
- [x] Extract interview-question knowledge points
- [x] Compare against self-test coverage
- [x] Decide insertion strategy without breaking old numbering
- **Status:** complete

### Phase 3: Implementation
- [x] Add missing self-test questions
- [x] Sync answer section
- [x] Preserve old numbering compatibility
- **Status:** complete

### Phase 4: Verification
- [x] Check numbering and cross-references
- [x] Record remaining uncovered points
- [x] Update progress logs
- **Status:** complete

### Phase 5: Delivery
- [ ] Summarize changes
- [ ] Explain residual gaps
- [ ] Propose next batch
- **Status:** in_progress

## Key Questions
1. `python 面试题.md` 当前覆盖了哪些知识点，而自测试卷尚未显式出题？
2. 在不改旧题号的前提下，新增题目采用什么编号最稳？
3. 本轮优先补哪些高价值缺口，能最大化提升覆盖率？

## Decisions Made
| Decision | Rationale |
|----------|-----------|
| 本轮不再顺延旧题号 | 用户明确担心题号影响；新增题只追加到各节末尾 |
| 以“面试题 + 手册总览”双基准审计 | 面试题偏应用，手册偏知识点，组合更完整 |
| 优先补应用型综合题 | 当前自测卷基础知识较全，综合场景题更有增益 |

## Errors Encountered
| Error | Attempt | Resolution |
|-------|---------|------------|
| `apply_patch` 通过 `exec_command` 触发警告 | 1 | 本轮改用 `python3` 脚本做定点编辑 |
| `rg` 查询命令引号冲突 | 1 | 改用 `python3` 做精确行号定位 |

## Notes
- 已确认复习状态持久化主键基于题干内容哈希，而非显示题号。
- 本轮新增题全部追加到各节末尾，没有再改动既有题号。
