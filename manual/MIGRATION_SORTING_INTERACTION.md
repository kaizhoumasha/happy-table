# Migration Guide: Sorting Interaction Changes

## Overview

Happy Table has improved the sorting interaction to prevent accidental sorting triggers and provide better user control.

## What Changed?

### Before
```
┌─────────────────────────────────┐
│  👆 Click anywhere → Sort       │
│  Column Title          [↑]      │
│  (entire cell clickable)        │
└─────────────────────────────────┘
```
- **Clicking anywhere** on the header cell triggered sorting
- Easy to accidentally trigger when selecting text
- Common frustration: "I just wanted to select the column name!"

### After
```
┌─────────────────────────────────┐
│  Column Title          👆[↑]    │
│  (only icon clickable)          │
└─────────────────────────────────┘
```
- **Only clicking the sort icon** triggers sorting
- Prevents accidental sorting during text selection
- More precise control over sorting actions

## Breaking Change

**This is a breaking behavior change with no configuration to restore the old behavior.**

Users must adapt to:
- Clicking the sort icon (↑↓) instead of the entire header cell
- Using Tab + Enter/Space for keyboard navigation to sort icons

## New Features

### 1. Keyboard Navigation

Sort icons now fully support keyboard navigation:

```typescript
// Tab to focus on sort icon
// Press Enter or Space to toggle sort
// Ctrl/Cmd + Enter to add as secondary sort
```

**Accessibility improvements:**
- Tab key navigation between sort icons
- Enter/Space key activation
- Clear focus indicators (blue ring)
- ARIA labels for screen readers

### 2. First-Time User Hint

A helpful tooltip appears on first hover:

```
       ┌──────────────┐
       │ Click to sort │
       └───────┬───────┘
           [↑]
```

**Features:**
- Appears automatically on first use
- Dismisses after first interaction
- Never shows again (stored in localStorage)
- Respects `prefers-reduced-motion`

## Testing Your Application

### Test Cases

1. **Basic Sorting**
   - Click sort icon → Should sort ascending
   - Click again → Should sort descending
   - Click third time → Should clear sort

2. **Multi-Field Sorting**
   - Ctrl/Cmd + Click icon → Should add as secondary sort
   - Works with both keyboard and mouse

3. **Text Selection**
   - Click header cell text → Should NOT trigger sort
   - Drag to select text → Should NOT trigger sort

4. **Keyboard Navigation**
   - Tab to focus sort icon → Should show focus ring
   - Enter/Space → Should toggle sort

### Example Test Script

```typescript
describe('Sorting Interaction', () => {
  it('only icon triggers sorting', () => {
    // Click header cell text - should NOT sort
    cy.get('.ht-header-cell').first().click({ force: true })
    cy.get('[aria-label*="Not sorted"]').should('exist')

    // Click sort icon - should sort
    cy.get('.ht-sort-icon').first().click()
    cy.get('[aria-label*="ascending"]').should('exist')
  })

  it('supports keyboard navigation', () => {
    // Tab to sort icon
    cy.get('.ht-sort-icon').first().focus()

    // Press Enter
    cy.get('.ht-sort-icon').first().type('{enter}')
    cy.get('[aria-label*="ascending"]').should('exist')
  })
})
```

## User Training

### Recommended Approach

**Option 1: In-App Tutorial**
```typescript
// Show tutorial on first load
if (!localStorage.getItem('sort-tutorial-shown')) {
  showTutorial({
    title: 'New Sorting Interaction',
    message: 'Click the sort icon (↑↓) to sort columns',
    target: '.ht-sort-icon',
    duration: 5000
  })
  localStorage.setItem('sort-tutorial-shown', 'true')
}
```

**Option 2: Release Notes**
Include in your release notes:
```markdown
## What's New
- **Improved Sorting**: Click the sort icon (↑↓) to sort columns
- **Keyboard Support**: Tab to sort icons, press Enter/Space to activate
```

## Common Issues & Solutions

### Issue: Users try to click header text

**Solution:** The built-in first-time hint will guide users. Additionally:
- Ensure sort icons are visually prominent
- Add hover effects to sort icons
- Consider a tooltip on header hover (first week only)

### Issue: Keyboard users can't access sorting

**Solution:** This is now solved! Sort icons have full keyboard support:
- Tab navigation works by default
- Make sure you don't disable focus outlines globally

```css
/* Good: Allow focus rings */
.ht-sort-icon:focus {
  outline: 2px solid blue;
}

/* Bad: Don't do this */
* { outline: none; } /* ❌ Breaks accessibility */
```

## Rollout Strategy

### Recommended Timeline

**Week 1: Internal Testing**
- Deploy to staging
- Test with internal users
- Gather initial feedback

**Week 2-3: Gradual Rollout**
- Enable for 25% of users
- Monitor for issues
- Increase to 50%, then 100%

**Week 4: Full Deployment**
- All users on new behavior
- Monitor feedback channels
- Update support documentation

### Monitoring

Track these metrics:
- Sort interaction success rate
- User feedback mentions of sorting
- Support tickets related to sorting
- Keyboard navigation usage

## Benefits Summary

| Aspect | Before | After |
|--------|--------|-------|
| **Accidental Sorts** | Common | Prevented |
| **Text Selection** | Triggers sort | Works normally |
| **Precision** | Low (entire cell) | High (icon only) |
| **Keyboard Access** | Limited | Full support |
| **Accessibility** | Basic | Enhanced (ARIA + focus) |

## Support & Resources

- [Sorting Configuration Guide](./sorting-configuration-guide.md) - Complete documentation
- [CHANGELOG.md](../CHANGELOG.md) - Full list of changes
- [API Reference](./sorting-configuration-guide.md#api-参考) - Sorting API details

## FAQ

**Q: Can I restore the old behavior?**
A: No, there is no configuration option. The new behavior is more precise and prevents accidental sorting.

**Q: How do I help users adapt?**
A: The built-in first-time hint will guide users automatically. You can also add a tutorial overlay or release notes.

**Q: Will this affect existing tests?**
A: Yes, update tests to click `.ht-sort-icon` instead of `.ht-header-cell`.

**Q: Is keyboard navigation supported?**
A: Yes! Tab to sort icons, then press Enter or Space to activate.

---

**Last Updated:** 2025-10-01
**Affected Versions:** 0.1.0+
**Migration Required:** Yes (behavior change, no code changes needed)
