// Creational Patterns
import { singletonPattern } from './singleton'
import { factoryPattern } from './factory'
import { abstractFactoryPattern } from './abstract-factory'
import { builderPattern } from './builder'
import { prototypePattern } from './prototype'

// Structural Patterns
import { adapterPattern } from './adapter'
import { bridgePattern } from './bridge'
import { compositePattern } from './composite'
import { decoratorPattern } from './decorator'
import { facadePattern } from './facade'
import { flyweightPattern } from './flyweight'
import { proxyPattern } from './proxy'

// Behavioral Patterns
import { observerPattern } from './observer'
import { chainOfResponsibilityPattern } from './chain-of-responsibility'
import { commandPattern } from './command'
import { iteratorPattern } from './iterator'
import { mediatorPattern } from './mediator'
import { mementoPattern } from './memento'
import { statePattern } from './state'
import { strategyPattern } from './strategy'
import { templateMethodPattern } from './template-method'
import { visitorPattern } from './visitor'

import { createPatternRegistry } from '@core/engine'

// Export all patterns
export { singletonPattern } from './singleton'
export { factoryPattern } from './factory'
export { abstractFactoryPattern } from './abstract-factory'
export { builderPattern } from './builder'
export { prototypePattern } from './prototype'

export { adapterPattern } from './adapter'
export { bridgePattern } from './bridge'
export { compositePattern } from './composite'
export { decoratorPattern } from './decorator'
export { facadePattern } from './facade'
export { flyweightPattern } from './flyweight'
export { proxyPattern } from './proxy'

export { observerPattern } from './observer'
export { chainOfResponsibilityPattern } from './chain-of-responsibility'
export { commandPattern } from './command'
export { iteratorPattern } from './iterator'
export { mediatorPattern } from './mediator'
export { mementoPattern } from './memento'
export { statePattern } from './state'
export { strategyPattern } from './strategy'
export { templateMethodPattern } from './template-method'
export { visitorPattern } from './visitor'

// Create and export the pattern registry with all patterns
export const patternRegistry = createPatternRegistry([
  // Creational (5)
  singletonPattern,
  factoryPattern,
  abstractFactoryPattern,
  builderPattern,
  prototypePattern,
  // Structural (7)
  adapterPattern,
  bridgePattern,
  compositePattern,
  decoratorPattern,
  facadePattern,
  flyweightPattern,
  proxyPattern,
  // Behavioral (10)
  observerPattern,
  chainOfResponsibilityPattern,
  commandPattern,
  iteratorPattern,
  mediatorPattern,
  mementoPattern,
  statePattern,
  strategyPattern,
  templateMethodPattern,
  visitorPattern,
])

// Export patterns grouped by category
export const creationalPatterns = patternRegistry.getPatternsByCategory('creational')
export const structuralPatterns = patternRegistry.getPatternsByCategory('structural')
export const behavioralPatterns = patternRegistry.getPatternsByCategory('behavioral')
