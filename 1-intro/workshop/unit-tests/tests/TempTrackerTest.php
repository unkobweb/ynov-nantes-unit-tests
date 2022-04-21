<?php

use PHPUnit\Framework\TestCase;

class TempTrackerTest extends TestCase {

    public function test_something() {
        $this->assertSame(42, 42);
    }

    public function test_add_bad_type_temp() {
        $tempTracker = new TempTracker();
        $tempTracker->insert('12');
    }

    // TODO test insert parameter should be an int

    // TODO test insert with in range 0 110

    // TODO test insert with
}