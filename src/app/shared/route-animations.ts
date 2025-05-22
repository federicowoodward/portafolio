import {
  animate,
  style,
  transition,
  trigger,
  query,
  group,
} from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
  transition('* <=> *', [
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          width: '100%',
          opacity: 0,
          transform: 'translateY(10px)',
        }),
      ],
      { optional: true }
    ),
    group([
      query(
        ':leave',
        [
          animate(
            '300ms ease-out',
            style({ opacity: 0, transform: 'translateY(-10px)' })
          ),
        ],
        { optional: true }
      ),
      query(
        ':enter',
        [
          animate(
            '300ms 100ms ease-out',
            style({ opacity: 1, transform: 'translateY(0)' })
          ),
        ],
        { optional: true }
      ),
    ]),
  ]),
]);
