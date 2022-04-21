<?php

use PHPUnit\Framework\TestCase;

class TempTrackerTest extends TestCase {

    /**
     * @dataProvider provider_bad_temp_types
     */
    public function test_cannot_insert_bad_temp_type($temp): void {
        self::expectException(TypeError::class);

        $tempTracker = new TempTracker();
        $tempTracker->insert($temp);
    }

    public function provider_bad_temp_types(): array
    {
        return [
            ["12"],
            [12.0],
            [null],
            [true]
        ];
    }

    /**
     * @dataProvider provider_bad_temp_values
     */
    public function test_cannot_insert_bad_temp_value($temp) {
        self::expectException(ValueError::class);

        $tempTracker = new TempTracker();
        $tempTracker->insert($temp);
    }

    public function provider_bad_temp_values() {
        return [
            [-1],
            [111],
            [2000]
        ];
    }

    public function test_cannot_get_mean_temp() {
        self::expectException(ValueError::class);
        $tempTracker = new TempTracker();
        $tempTracker->get_mean();
    }

    public function test_can_add_temp() {
        $tempTracker = new TempTracker();
        $tempTracker->insert(42);

        $temps = $tempTracker->get_temps();

        self::assertContains(42, $temps);
    }
}