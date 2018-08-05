#lang racket

(define test(lambda (expected result)
    (if (equal? expected result)
        (display "true")
        (display "false"))
    (newline)))

;; PRE-CONDITION: lst is a list of letters
;; RET: number of syllales
(define count-syllables(lambda (lst)
  (if (null? lst)
      0
      (if(member (car lst) '(a e i o u))
         (+ 1 (skip-vowels (cdr lst)))
         (count-syllables (cdr lst))))))

(define skip-vowels(lambda (lst)
  (if (null? lst)
      (count-syllables '())
      (if (member (car lst) '(a e i o u))
          (skip-vowels (cdr lst))
          (count-syllables lst)))))

(test 3 (count-syllables '(o f f i c e)))
(test 2 (count-syllables '(c o f f e e)))
(test 0 (count-syllables '(s k y)))
(test 2 (count-syllables '(t e a c h e r)))
(test 4 (count-syllables '(w i k i p e d i a)))

;; PRE-CONDITION: lst is a list of numbers, comp : < | > | = 
;; RET: #t iff the list is sorted according to the comp argument
;; returns #f otherwise
;; if the list is empty - returns true because it is our stopping condition and the list considered
;; sorted in an empty way
;; if the list contains only one element it considered sorted in an empty way
(define sorted?(lambda (lst comp)
  (if (null? lst)
      #t
      (if(null? (cdr lst))
         #t
         (if (comp (car lst) (car (cdr lst)))
             (sorted? (cdr lst) comp)
             #f)))))

(test #t (sorted? '(1 3 5) <))
(test #t (sorted? '(11 9 5 3 1) >))
(test #f (sorted? '(10 9 8) <))
(test #t (sorted? '(10 10 10) =))
(test #f (sorted? '(10 11 5 12 13 2) >))


;; PRE-CONDITION : (sorted? lst1 <) = #t and (sorted? lst2 <) = #t
;; RET: a sorted union of lst1 and lst2
(define merge (lambda (lst1 lst2)
    (if (sorted? lst1 <)
        (if(sorted? lst2 <)
           (if (null? lst1)
               lst2
               (if(null? lst2)
                  lst1
                  (if(< (car lst1) (car lst2))
                     (cons (car lst1) (merge (cdr lst1) lst2))
                     (cons (car lst2) (merge lst1 (cdr lst2))))))
           (error 'sortedfailed));;todo error?
        (error 'sortedfailed))))

(test '(1 2 3 4) (merge '(1 3) '(2 4)))
(test '(1 3 5 8 12 13) (merge '(1 3 5) '(8 12 13)))
(test '(0 1 2 3) (merge '(0 2 3) '(1)))
(test '(1 2 3 4 5) (merge '() '(1 2 3 4 5)))
(test '(2 3 4 9 10 12 15) (merge '(3 9 10 12) '(2 4 15)))

;; PRE-CONDITION: list of letters
;; RET: returns a list with the same elements and withour adjacent duplicates
(define remove-adjacent-duplicates (lambda (lst)
  (if (null? lst)
      '()
      (if (null? (cdr lst))
          lst
          (if (equal? (car lst) (car (cdr lst)))
              (remove-adjacent-duplicates (cons (car lst) (cdr (cdr lst))))
              (cons (car lst) (remove-adjacent-duplicates (cdr lst))))))))
    
(test '(a b c) (remove-adjacent-duplicates '(a b b c c c)))
(test '(y a b a d a b a d o) (remove-adjacent-duplicates '(y a b b a d a b b a d o o)))
(test '(yeah) (remove-adjacent-duplicates '(yeah yeah yeah)))
(test '(1 2 3 4 5 6 7 8 9) (remove-adjacent-duplicates '(1 2 3 4 4 5 6 7 7 7 8 9 9)))
(test '(remove adjacent duplicates) (remove-adjacent-duplicates '(remove remove adjacent adjacent adjacent adjacent duplicates)))




