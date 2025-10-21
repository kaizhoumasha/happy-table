# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed - Sorting Interaction Optimization

#### ⚠️ Breaking Change

**Sorting interaction has been improved for better UX:**
- **Before**: Clicking anywhere on the header cell triggers sorting
- **After**: Only clicking the sort icon triggers sorting
- **Impact**: Users must click the sort icon instead of the entire header cell
- **Benefit**: Prevents accidental sorting when selecting text or interacting with headers

#### 🎯 New Features

- **Keyboard Navigation**: Sort icons now fully support keyboard navigation
  - Added `tabindex="0"` for focus management
  - Support for `Enter` and `Space` keys
  - Focus ring indicator for accessibility

- **First-Time User Hint**: Visual tooltip on first hover
  - Appears on first hover over unsorted column icons
  - Auto-dismisses after first click
  - Stored in localStorage to prevent repeated displays
  - Respects `prefers-reduced-motion` for accessibility


#### 📚 Documentation

- Added comprehensive sorting configuration guide: `manual/sorting-configuration-guide.md`
  - Complete API reference
  - Configuration hierarchy explanation
  - Best practices and examples
  - Troubleshooting guide

#### 🐛 Fixes

- Improved sorting interaction precision
- Reduced accidental sort triggers when:
  - Selecting header text
  - Dragging columns (if enabled)
  - Clicking near sort icons

#### ♿ Accessibility Improvements

- Enhanced ARIA labels for sort state
- Keyboard navigation fully supported
- Focus management for screen readers
- High contrast mode support for hints

### Technical Details

**Modified Files:**
- `src/lib/components/table-renderer/header/HeaderCell.vue`: Removed full-cell click handler
- `src/lib/components/table-renderer/header/SortIndicator.vue`: Added keyboard navigation + user hints
- `manual/sorting-configuration-guide.md`: New comprehensive guide (1498 lines)

**Migration:**

No configuration available to restore old behavior. Users need to adapt to clicking sort icons directly.

**Why This Change?**

This change aligns Happy Table with modern data grid UX patterns:
- ✅ Prevents accidental sorting during text selection
- ✅ More precise interaction control
- ✅ Consistent with modern professional data grids
- ✅ Enhanced keyboard accessibility

---

## [0.0.0] - Initial Development

- Initial project setup
- Core grid functionality
- Plugin system architecture
- Basic sorting, filtering, and selection features
